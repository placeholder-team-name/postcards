import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import LoadingSpinner from "./components/LoadingSpinner";
import { Router } from "@reach/router";

import RedirectIfNotSignedIn from "./components/RedirectIfNotSignedIn";
import RedirectIfSignedIn from "./components/RedirectIfSignedIn";
import NavBar from "./components/NavBar";

import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { WriteAndPreviewComponent } from "./components/WriteAndPreviewComponent";

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
        });
    }, []);

    return (
        // TODO: We probably have to have a hook to make sure the splash screen appears for 0.5 seconds.
        <>
            {loading && <LoadingSpinner />}
            {!loading && (
                <>
                    <NavBar />
                    <Router>
                        <RedirectIfSignedIn auth={auth} path="/auth">
                            <LandingPage path="/d" />
                            <SignupPage path="/signup" />
                            <SigninPage path="/signin" />
                        </RedirectIfSignedIn>
                        <RedirectIfNotSignedIn
                            to="/auth/signup"
                            path="/"
                            auth={auth}
                        >
                            <Test path="hithere" />
                            <WriteAndPreviewComponent path="editor/*" />
                        </RedirectIfNotSignedIn>
                    </Router>
                </>
            )}
        </>
    );
}

/**
 * TODO: Remove this class, it is just used as a simple thing for the beginning of the application
 *
 */
const Test = () => {
    return <></>;
};
export default App;
