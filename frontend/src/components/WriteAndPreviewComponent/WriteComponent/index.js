import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const WriteComponent = ({ user, userNotebookContent, setUserNotebookContent }) => {
    const [savedLatestDataToFirebase, setSavedLatestDateToFirebase] = useState(true);
    const [errorSaving, setErrorSaving] = useState("");

    const sendUserNotebookContentToFirebase = () => {
        // convert to HTML
        // send to firebase (uid/year/month)
        // 
    }

    return <>
        <Editor editorState={userNotebookContent}
            onEditorStateChange={(e) => setUserNotebookContent(e)} />
    </>
}