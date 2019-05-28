import React, { useState } from 'react';
import { WriteComponent } from './WriteComponent';
import { Router } from '@reach/router';
import { EditorState } from 'draft-js';

export const WriteAndPreviewComponent = () => {
    const [userNotebookContent, setUserNotebookContent] = useState(EditorState.createEmpty());

    // console.log(userNotebookContent.getCurrentContent().getPlainText());
    return <>
        WriteAndPreviewComponent
        <Router>
            <WriteComponent path="write"
                userNotebookContent={userNotebookContent}
                setUserNotebookContent={setUserNotebookContent} />
        </Router>
    </>
}