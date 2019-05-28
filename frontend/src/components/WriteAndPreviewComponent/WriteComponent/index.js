import React, { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from '../../globals';
import firebase from 'firebase/app';
import 'firebase/database';

export const WriteComponent = ({ user, userNotebookContent, setUserNotebookContent }) => {
    const [savedLatestDataToFirebase, setSavedLatestDateToFirebase] = useState(true);
    const [errorSaving, setErrorSaving] = useState("");

    const sendUserNotebookContentToFirebase = async () => {
        try {
            let convertedToHtml = draftToHtml(convertToRaw(userNotebookContent.getCurrentContent()));
            const currentTime = new Date();
            const year = currentTime.getYear() + 1900;
            const month = currentTime.getMonth();
            const notebookRef = firebase.database().ref(`${user.uid}/${year}/${month}`);
            await notebookRef.set(convertedToHtml);
            setErrorSaving("");
        }
        catch (e) {
            setErrorSaving(e.message);
        }
    }

    return <>
        <Editor editorState={userNotebookContent}
            onEditorStateChange={(e) => setUserNotebookContent(e)} />
        <Button onClick={(e) => {
            sendUserNotebookContentToFirebase();
        }}>Test</Button>
    </>
}