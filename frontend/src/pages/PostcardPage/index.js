import React, { useEffect } from "react";
import { Heading, Container } from "../../components/globals";

function isTokenSentToServer() {
    return window.localStorage.getItem("sentToServer") === "1";
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem("sentToServer", sent ? "1" : "0");
}

function sendTokenToServer(refreshedToken) {}

function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // In many cases once an app has been granted notification permission,
            // it should update its UI reflecting this.
            // resetUI();
        } else {
            console.log("Unable to get permission to notify.");
        }
    });
}

const PostcardPage = ({ user }) => {
    useEffect(() => {
        // TODO: Could this cause a race condition where Firebase isn't ready yet?
        requestPermission();
    });

    return (
        <Container>
            <Heading as="h1" fontSize={5} mt={12}>
                {user.displayName}
            </Heading>
        </Container>
    );
};

export default PostcardPage;
