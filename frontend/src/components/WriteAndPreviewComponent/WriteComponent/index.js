import React, { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from '../../globals';
import firebase from 'firebase/app';
import 'firebase/database';
import ErrorContent from '../../ErrorContent';

export const WriteComponent = ({ user, userNotebookContent, setUserNotebookContent, year, month }) => {
    const [savedLatestDataToFirebase, setSavedLatestDataToFirebase] = useState(true);
    const [errorSaving, setErrorSaving] = useState("");

    const sendUserNotebookContentToFirebase = async () => {
        try {
            let convertedToHtml = draftToHtml(convertToRaw(userNotebookContent.getCurrentContent()));
            const notebookRef = firebase.database().ref(`${user.uid}/${year}/${month}`);
            await notebookRef.set(convertedToHtml);
            setErrorSaving("");
            setSavedLatestDataToFirebase(true);
        }
        catch (e) {
            setErrorSaving(e.message);
        }
    }

    return <>
        <ErrorContent errorMessage={errorSaving} />
        <Editor editorState={userNotebookContent}
            onEditorStateChange={(e) => {
                if (savedLatestDataToFirebase) {
                    setSavedLatestDataToFirebase(false);
                }
                setUserNotebookContent(e);
            }}
            toolbar={
                {
                    image: {
                        uploadCallback: () => {
                            // TODO: 
                        }
                    }
                }
            } />
        <Button disabled={savedLatestDataToFirebase} onClick={(e) => {
            sendUserNotebookContentToFirebase();
        }}>Test</Button>
    </>
}