import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "../../components/globals";
import { Redirect } from "@reach/router";

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirectToMain, setRedirectToMain] = useState(false);
    return <>
        {error && <>ERROR: {error}</>}
        {redirectToMain && <Redirect from="/auth/signin" to="/" noThrow />}
        email: <input value={email} onChange={e => setEmail(e.target.value)} />
        password: <input value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={async () => {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                setRedirectToMain(true);
            } catch (e) {
                setError(e.message);
            }
        }}>SUBMIT</Button>
    </>
}

export default SigninPage;