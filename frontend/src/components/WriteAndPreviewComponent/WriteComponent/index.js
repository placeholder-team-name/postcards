import React, { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from '../../globals';

export const WriteComponent = ({ user, userNotebookContent, setUserNotebookContent }) => {
    const [savedLatestDataToFirebase, setSavedLatestDateToFirebase] = useState(true);
    const [errorSaving, setErrorSaving] = useState("");

    const sendUserNotebookContentToFirebase = () => {
        let convertedToHtml = draftToHtml(convertToRaw(userNotebookContent.getCurrentContent()));
        // console.log(convertedToHtml);
        // convert to HTML
        // send to firebase (uid/year/month)
        // 
    }

    return <>
        <Editor editorState={userNotebookContent}
            onEditorStateChange={(e) => setUserNotebookContent(e)} />
        <Button onClick={(e) => {
            sendUserNotebookContentToFirebase();
        }}>Test</Button>
    </>
}