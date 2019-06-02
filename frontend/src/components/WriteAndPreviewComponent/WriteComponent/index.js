import React, { useState, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "../../globals";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import ErrorContent from "../../ErrorContent";
import WritePrompt from "../WritePrompt";
import { Link } from "@reach/router";

export const WriteComponent = ({
    user,
    userNotebookContent,
    setUserNotebookContent,
    year,
    month,
    currentTime
}) => {
    const [savedLatestDataToFirebase, setSavedLatestDataToFirebase] = useState(
        true
    );
    const [errorSaving, setErrorSaving] = useState("");
    const [editorRef, setEditorRef] = useState(null);

    const sendUserNotebookContentToFirebase = async () => {
        try {
            let convertedToHtml = draftToHtml(
                convertToRaw(userNotebookContent.getCurrentContent())
            );
            const notebookRef = firebase
                .database()
                .ref(`${user.uid}/${year}/${month}`);
            await notebookRef.set(convertedToHtml);
            setErrorSaving("");
            setSavedLatestDataToFirebase(true);
        } catch (e) {
            setErrorSaving(e.message);
        }
    };

    /*
                <Link to="/preview">
                <Button>Preview</Button>
            </Link>
            */

    /*

                  <Button
                disabled={savedLatestDataToFirebase}
                onClick={e => {
                    sendUserNotebookContentToFirebase();
                }}
            >
                Save
            </Button>
                        <WritePrompt currentTime={currentTime} year={year} month={month} />

            */

    /* TODO: LIFT THIS UP:             <ErrorContent errorMessage={errorSaving} /> */

    const handleEditorRef = ref => {
        setEditorRef(ref);
        ref.focus();
        const LOL = document.createElement("p");
        LOL.style.fontSize = "20px";
        LOL.innerHTML =
            "Good evening! Happy June! Summer is starting! How do you feel about that?";
        LOL.style.userSelect = "none";
        LOL.style.color = "#808080";
        ref.editorContainer.insertBefore(LOL, ref.editorContainer.firstChild);
    };

    return (
        <>
            <Editor
                editorState={userNotebookContent}
                onEditorStateChange={e => {
                    if (savedLatestDataToFirebase) {
                        setSavedLatestDataToFirebase(false);
                    }
                    setUserNotebookContent(e);
                }}
                editorRef={handleEditorRef}
                toolbarStyle={{
                    border: "none",
                    marginBottom: 0,
                    position: "relative",
                    borderTop: "1px solid #EFEFF4",
                    borderBottom: "1px solid #EFEFF4",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "8px",
                    paddingBottom: "8px"
                }}
                editorStyle={{
                    backgroundColor: "white",
                    overflowY: "auto",
                    position: "relative",
                    flex: "1 1 auto",
                    paddingTop: "48px",
                    paddingBottom: "48px",
                    paddingLeft: "24px",
                    paddingRight: "24px"
                }}
                wrapperStyle={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "hidden"
                }}
                toolbar={{
                    image: {
                        previewImage: true,
                        uploadCallback: async file => {
                            if (file && file.size < 10000000) {
                                // is 10 MB == 10 million bytes
                                let imageRefUrl = `${user.uid}/${Date.now()}/${
                                    file.name
                                }`;
                                let storageRef = firebase
                                    .storage()
                                    .ref(imageRefUrl);
                                const snap = await storageRef.put(file);
                                const downloadUrl = await snap.ref.getDownloadURL();

                                // the uploadcallback expects this object shape to be returned
                                return { data: { link: downloadUrl } };
                            } else {
                                setErrorSaving(
                                    "Failed to upload image: Image too large!"
                                );
                                throw new Error("Failed to upload image");
                            }
                        }
                    }
                }}
            />
        </>
    );
};
