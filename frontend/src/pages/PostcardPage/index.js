import React, { useEffect } from "react";
import { Heading, Container } from "../../components/globals";
import { db, messaging } from "../../firebase";

function isTokenSentToServer() {
    return window.localStorage.getItem("sentToServer") === "1";
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem("sentToServer", sent ? "1" : "0");
}

const PostcardPage = ({ user }) => {
    useEffect(() => {
        // TODO: Make sure there is only one listener and clean up
        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(function() {
            messaging
                .getToken()
                .then(function(refreshedToken) {
                    console.log("Token refreshed.");
                    // Indicate that the new Instance ID token has not yet been sent to the
                    // app server.
                    setTokenSentToServer(false);
                    // Send Instance ID token to app server.
                    sendTokenToServer(refreshedToken);
                    // Display new Instance ID token and clear UI of all previous messages.
                    resetUI();
                })
                .catch(function(err) {
                    console.log("Unable to retrieve refreshed token ", err);
                });
        });

        // TODO: Could this cause a race condition where Firebase isn't ready yet?
        requestPermission();
    });

    function requestPermission() {
        console.log("Requesting permission...");
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                console.log("Notification permission granted.");
                // TODO(developer): Retrieve an Instance ID token for use with FCM.
                // In many cases once an app has been granted notification permission,
                // it should update its UI reflecting this.
                resetUI();
            } else {
                console.log("Unable to get permission to notify.");
            }
        });
    }

    messaging.onMessage(function(payload) {
        console.log("Message received. ", payload);
        // [START_EXCLUDE]
        // Update the UI to include the received message.
        // [END_EXCLUDE]
    });

    function sendTokenToServer(refreshedToken) {
        if (!isTokenSentToServer()) {
            console.log("Sending token to server...");

            // TODO: See if DB has functionality similar to
            // Firestore's `{ merge: true }` so we don't
            // have to retrieve tokens first
            db.ref(`push-notification-tokens/${user.uid}`)
                .once("value")
                .then(function(snapshot) {
                    let tokens = {};

                    if (snapshot) {
                        tokens = {
                            ...snapshot.val(),
                            [refreshedToken]: true
                        };
                    } else {
                        tokens = {
                            [refreshedToken]: true
                        };
                    }

                    db.ref(`push-notification-tokens/${user.uid}`).set(tokens);
                });

            setTokenSentToServer(true);
        } else {
            console.log(
                "Token already sent to server so won't send it again " +
                    "unless it changes"
            );
        }
    }

    function resetUI() {
        // clearMessages();
        // showToken("loading...");
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging
            .getToken()
            .then(function(currentToken) {
                if (currentToken) {
                    sendTokenToServer(currentToken);
                    // updateUIForPushEnabled(currentToken);
                } else {
                    // Show permission request.
                    console.log(
                        "No Instance ID token available. Request permission to generate one."
                    );
                    // Show permission UI.
                    // updateUIForPushPermissionRequired();
                    setTokenSentToServer(false);
                }
            })
            .catch(function(err) {
                console.log("An error occurred while retrieving token. ", err);
                // showToken("Error retrieving Instance ID token. ", err);
                setTokenSentToServer(false);
            });
    }

    return (
        <Container>
            <Heading as="h1" fontSize={5} mt={12}>
                {user.displayName}
            </Heading>
        </Container>
    );
};

export default PostcardPage;
