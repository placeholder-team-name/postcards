import React, { useState, useEffect } from 'react';
import { WriteComponent } from './WriteComponent';
import { Router } from '@reach/router';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { PreviewComponent } from './PreviewComponent';
import firebase from 'firebase/app';
import 'firebase/database';
import LoadingSpinner from '../LoadingSpinner';

export const WriteAndPreviewComponent = ({ user }) => {
    const [userNotebookContent, setUserNotebookContent] = useState(EditorState.createEmpty());
    const [loading, setLoading] = useState(true);

    const currentTime = new Date();
    const year = currentTime.getYear() + 1900;
    const month = currentTime.getMonth();

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
            setLoading(false);
        });

        return () => {
            notebookRef.off();
        }
    }, [])


    return <>
        {loading && <LoadingSpinner />}
        {!loading &&
            <Router>
                <WriteComponent path="write"
                    user={user}
                    userNotebookContent={userNotebookContent}
                    setUserNotebookContent={setUserNotebookContent}
                    year={year}
                    month={month} />
                <PreviewComponent path="preview" />
            </Router>
        }
    </>
}