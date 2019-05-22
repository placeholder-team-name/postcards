import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "../../components/globals";
import { Redirect } from "@reach/router";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);
    return <>
        {error && <>ERROR: {error}</>}
        {redirectToSignIn && <Redirect from="/auth/signup" to="/auth/signin" noThrow />}
        email: <input value={email} onChange={e => setEmail(e.target.value)} />
        password: <input value={password} onChange={e => setPassword(e.target.value)} />
        full name: <input value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <Button onClick={async () => {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                await firebase.auth().currentUser.updateProfile({ displayName });
                setRedirectToSignIn(true);
            } catch (e) {
                setError(e.message);
            }
        }}>SUBMIT</Button>
    </>
}

export default SignupPage;