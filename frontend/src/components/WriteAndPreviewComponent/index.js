import React, { useState, useEffect } from 'react';
import { WriteComponent } from './WriteComponent';
import { Router } from '@reach/router';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { PreviewComponent } from './PreviewComponent';
import firebase from 'firebase/app';
import 'firebase/database';

export const WriteAndPreviewComponent = ({ user }) => {
    const [userNotebookContent, setUserNotebookContent] = useState(EditorState.createEmpty());
    const [loading, setLoading] = useState(false);

    const currentTime = new Date();
    const year = currentTime.getYear() + 1900;
    const month = currentTime.getMonth();

    // useful snippet: https://joshtronic.com/2017/10/05/react-draft-wysiwyg-with-mongodb/
    // console.log(convertToRaw(userNotebookContent.getCurrentContent()));
    useEffect(() => {
        const notebookRef = firebase.database().ref(`${user.uid}/${year}/${month}`);
        notebookRef.on('value', (snap) => {
            let notebookContent = snap.val() || "";
            const blocksFromHTML = convertFromHTML(notebookContent);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            setUserNotebookContent(EditorState.createWithContent(state));
        })
    })


    return <>
        WriteAndPreviewComponent
        <Router>
            <WriteComponent path="write"
                user={user}
                userNotebookContent={userNotebookContent}
                setUserNotebookContent={setUserNotebookContent}
                year={year}
                month={month} />
            <PreviewComponent path="preview" />
        </Router>
    </>
}