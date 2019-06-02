import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { Router } from "@reach/router";
import { EditorState, convertFromHTML, ContentState } from "draft-js";

import { WriteComponent } from "./WriteComponent";
import { PreviewComponent } from "./PreviewComponent";
import NavBarSecondary from "../NavBarSecondary";
import LoadingSpinner from "../LoadingSpinner";
import { Container, Heading } from "../globals";

const WriteAndPreviewComponent = ({ user }) => {
    const [userNotebookContent, setUserNotebookContent] = useState(
        EditorState.createEmpty()
    );
    const [HTMLContent, setHTMLContent] = useState("");
    const [loading, setLoading] = useState(true);

    const currentTime = new Date();
    const year = currentTime.getYear() + 1900;
    const month = currentTime.getMonth();

    useEffect(() => {
        const notebookRef = firebase
            .database()
            .ref(`${user.uid}/${year}/${month}`);
        notebookRef.on("value", snap => {
            const notebookContent = snap.val() || "";
            // default editor state to empty
            let editorState = EditorState.createEmpty();

            const { contentBlocks, entityMap } = convertFromHTML(
                notebookContent
            );

            if (contentBlocks) {
                // boilerplate code to generate the editor state from a string
                // then store it into state
                const contentState = ContentState.createFromBlockArray(
                    contentBlocks,
                    entityMap
                );
                // replace default editor state with actual state
                editorState = EditorState.createWithContent(contentState);
            }

            setHTMLContent(notebookContent);
            setUserNotebookContent(editorState);
            setLoading(false);
        });

        return () => {
            notebookRef.off();
        };
    }, [month, user, year]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflowY: "hidden"
            }}
        >
            <NavBarSecondary />
            <div
                style={{
                    overflowY: "auto",
                    position: "relative",
                    flex: "1 1 auto"
                }}
            >
                {loading && <LoadingSpinner />}
                {!loading && (
                    <>
                        <Container>
                            <Router>
                                <WriteComponent
                                    path="/"
                                    user={user}
                                    userNotebookContent={userNotebookContent}
                                    setUserNotebookContent={
                                        setUserNotebookContent
                                    }
                                    year={year}
                                    month={month}
                                    currentTime={currentTime}
                                />
                                <PreviewComponent
                                    path="preview"
                                    HTMLContent={HTMLContent}
                                />
                            </Router>
                        </Container>
                    </>
                )}
            </div>
        </div>
    );
};

export default WriteAndPreviewComponent;
