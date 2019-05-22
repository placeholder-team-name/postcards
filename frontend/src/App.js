import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import ExamplePage from "./pages/ExamplePage";
import LoadingSpinner from "./components/LoadingSpinner";
import { WriteAndPreviewComponent } from "./components/WriteAndPreviewComponent/WriteAndPreviewComponent";
import { Router, Redirect } from '@reach/router';

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
                        <RedirectIfNotSignedIn path="/" auth={auth}>
                            <Test path="hithere" />
                        </RedirectIfNotSignedIn>
                    </Router>
                </>
            )}
        </>
    );
}

const SignupPage = () => {
    return <>Signup page</>
}

const SigninPage = () => {
    return <>Signin page</>
}

const RedirectIfNotSignedIn = ({ auth, children }) => {
    if (!auth) {
        return <Redirect to="/signup" noThrow />
    }
    return <>
        {children}
    </>
}

const Test = () => {
    return <>Test</>
}
export default App;
