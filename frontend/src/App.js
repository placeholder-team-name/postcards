import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.css';
import { LoadingSpinner } from './LoadingSpinner/LoadingSpinner';
import { WriteAndPreviewComponent } from './WriteAndPreviewComponent/WriteAndPreviewComponent';

function App() {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setAuth(user);
            } else {
                setAuth(null);
            }
            setLoading(false);
        })
    }, [])

    return ( // TODO: We probably have to have a hook to make sure the splash screen appears for 0.5 seconds.
        <>
            {loading && <LoadingSpinner />}
            {!loading && <>
                {auth && <WriteAndPreviewComponent />}
                {!auth && <div>Authentication window placeholder</div>}
            </>}
        </>
    );
}

export default App;
