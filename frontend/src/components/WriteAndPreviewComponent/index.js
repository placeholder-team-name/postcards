import React, { useState } from 'react';
import { WriteComponent } from './WriteComponent';
import { Router } from '@reach/router';
import { EditorState, convertToRaw } from 'draft-js';
import { PreviewComponent } from './PreviewComponent';

export const WriteAndPreviewComponent = ({ user }) => {
    const [userNotebookContent, setUserNotebookContent] = useState(EditorState.createEmpty());

    // useful snippet: https://joshtronic.com/2017/10/05/react-draft-wysiwyg-with-mongodb/
    // console.log(convertToRaw(userNotebookContent.getCurrentContent()));

    return <>
        WriteAndPreviewComponent
        <Router>
            <WriteComponent path="write"
                user={user}
                userNotebookContent={userNotebookContent}
                setUserNotebookContent={setUserNotebookContent} />
            <PreviewComponent path="preview" />
        </Router>
    </>
}