import React, { useState } from "react";
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
    currentTime,
    lastEditedTime
}) => {
    const [savedLatestDataToFirebase, setSavedLatestDataToFirebase] = useState(
        true
    );
    const [errorSaving, setErrorSaving] = useState("");

    const sendUserNotebookContentToFirebase = async () => {
        try {
            let convertedToHtml = draftToHtml(
                convertToRaw(userNotebookContent.getCurrentContent())
            );
            const notebookRef = firebase
                .database()
                .ref(`${user.uid}/${year}/${month}`);
            let lastEditedTime = firebase.database.ServerValue.TIMESTAMP;
            const valueToSet = {
                notebookContent: convertedToHtml,
                lastEditedTime
            }
            await notebookRef.set(valueToSet);
            setErrorSaving("");
            setSavedLatestDataToFirebase(true);
        } catch (e) {
            setErrorSaving(e.message);
        }
    };

    return (
        <>
            <ErrorContent errorMessage={errorSaving} />
            <Link to="/preview">
                <Button>Preview</Button>
            </Link>
            {(!lastEditedTime || (lastEditedTime.getDate() !== currentTime.getDate())) && <WritePrompt currentTime={currentTime} year={year} month={month} />}
            <Editor
                editorState={userNotebookContent}
                onEditorStateChange={e => {
                    if (savedLatestDataToFirebase) {
                        setSavedLatestDataToFirebase(false);
                    }
                    setUserNotebookContent(e);
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
            <Button
                disabled={savedLatestDataToFirebase}
                onClick={e => {
                    sendUserNotebookContentToFirebase();
                }}
            >
                Save
            </Button>
        </>
    );
};
