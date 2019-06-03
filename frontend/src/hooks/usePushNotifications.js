import { useState, useEffect } from "react";
import { db, messaging } from "../firebase";

function usePushNotifications(user) {
    const [pushIsEnabled, setPushIsEnabled] = useState(false);

    useEffect(() => {
        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(function() {
            messaging
                .getToken()
                .then(function(refreshedToken) {
                    console.log("Token refreshed.");
                    setTokenSentToServer(false);
                    sendTokenToServer(refreshedToken);
                    resetUI();
                })
                .catch(function(err) {
                    // TODO: Anything we need to do here?
                    console.log("Unable to retrieve refreshed token ", err);
                });
        });
    }, []);

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
                    setPushIsEnabled(true);
                } else {
                    console.log(
                        "Request permission to generate an Instance ID."
                    );
                    setPushIsEnabled(false);
                    setTokenSentToServer(false);
                }
            })
            .catch(function(err) {
                console.log("An error occurred while retrieving token. ", err);
                setPushIsEnabled(false);
                setTokenSentToServer(false);
            });
    }

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
            console.log("Token already sent to server");
        }
    }

    function isTokenSentToServer() {
        return window.localStorage.getItem("sentToServer") === "1";
    }

    function setTokenSentToServer(sent) {
        window.localStorage.setItem("sentToServer", sent ? "1" : "0");
    }

    return [pushIsEnabled, requestPermission];
}

export default usePushNotifications;
