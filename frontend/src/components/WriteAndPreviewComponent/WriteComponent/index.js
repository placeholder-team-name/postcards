import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const WriteComponent = ({ userNotebookContent, setUserNotebookContent }) => {
    return <>
        <Editor editorState={userNotebookContent}
            onEditorStateChange={(e) => setUserNotebookContent(e)} />
    </>
}