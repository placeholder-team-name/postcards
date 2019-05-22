import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import LoadingSpinner from "./components/LoadingSpinner";
import { Router } from "@reach/router";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import RedirectIfNotSignedIn from "./components/RedirectIfNotSignedIn";

function App() {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setAuth(user);
            } else {
                setAuth(true);
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
                    <Router>
                        <SignupPage path="/signup" />
                        <SigninPage path="/signin" />
                        <RedirectIfNotSignedIn to="/signup" path="/" auth={auth}>
                            <Test path="hithere" />
                        </RedirectIfNotSignedIn>
                    </Router>
                </>
            )}
        </>
    );
}


const Test = () => {
    return <>Test</>
}
export default App;
