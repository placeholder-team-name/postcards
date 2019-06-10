import React, { useState } from "react";
import firebase from "firebase";
import { navigate } from "@reach/router";

import {
    Heading,
    Container,
    Measure,
    Text,
    Button,
    ScrollView
} from "../../components/globals";

const LandingPage = () => {
    const [authError, setAuthError] = useState(null);

    const handleLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await firebase.auth().signInWithPopup(provider);
            navigate("/");
        } catch (error) {
            setAuthError(error);
        }
    };

    return (
        <ScrollView>
            <Container my={12}>
                <Heading as="h1" fontSize={6} mt={0}>
                    Login or sign up
                </Heading>
                <Measure mt={6}>
                    <Text>
                        Write your postcard now. The writing process is easy and fun.
                        We'll help extend the information you want to share 
                        to your family members and friends.
                    </Text>
                </Measure>
                <Measure mt={6}>
                    <Button onClick={handleLogin} bg="#dd5044">
                        Continue with Google
                    </Button>
                    {authError && <Text mt={4}>{authError.message}</Text>}
                </Measure>
            </Container>
        </ScrollView>
    );
};

export default LandingPage;
