import { useState, useEffect } from "react";
import { messaging, db } from "../firebase";

const PERMISSION_GRANTED = "granted";

function usePush(user) {
    // isPushEnabled = true when all three conditions are met:
    // 1. the user has enabled browser push notifications
    // 2. the user has enabled push notifications in our app
    // 3. firebase has a push notification token
    const [isPushEnabled, setIsPushEnabled] = useState(false);

    useEffect(() => {
        // Check if push notifications are currently enabled
        updateIsPushEnabled();

        // Callback fired if token is updated
        return messaging.onTokenRefresh(() => {
            messaging
                .getToken()
                .then(refreshedToken => {
                    // The downside of this approach is that
                    // we re-enable the user's in-app push notification
                    // preferences when their token gets refreshed
                    enableToken(refreshedToken)
                        .then(() => {
                            setIsPushEnabled(true);
                        })
                        .catch(() => {
                            setIsPushEnabled(false);
                        });
                })
                .catch(err => {
                    console.log("Unable to retrieve refreshed token. ", err);
                    // TODO: It might be too extreme to switch push notifications
                    // off if this API call has only failed one time
                    setIsPushEnabled(false);
                });
        });
    }, []);

    function enablePush(override = true) {
        Notification.requestPermission().then(permission => {
            if (permission === PERMISSION_GRANTED) {
                messaging
                    .getToken()
                    .then(currentToken => {
                        if (currentToken) {
                            tokenExists(currentToken)
                                .then(exists => {
                                    if (override || !exists) {
                                        enableToken(currentToken)
                                            .then(() => {
                                                setIsPushEnabled(true);
                                            })
                                            .catch(() => {
                                                setIsPushEnabled(false);
                                            });
                                    }
                                    // TODO: We do nothing if a token already
                                    // exists, but it might be good to make
                                    // sure isPushEnabled is up to date
                                })
                                .catch(() => {
                                    setIsPushEnabled(false);
                                });
                        } else {
                            setIsPushEnabled(false);
                        }
                    })
                    .catch(err => {
                        console.log(
                            "An error occurred while retrieving token. ",
                            err
                        );
                        setIsPushEnabled(false);
                    });
            } else {
                console.log("Unable to get permission to notify.");
                setIsPushEnabled(false);
            }
        });
    }

    function disablePush() {
        messaging
            .getToken()
            .then(currentToken => {
                if (currentToken) {
                    disableToken(currentToken)
                        .then(() => {
                            setIsPushEnabled(false);
                        })
                        .catch(() => {
                            // We failed to disable the token so we
                            // simply ensure that the push notification
                            // status is accurate
                            updateIsPushEnabled();
                        });
                } else {
                    // We failed to retrieve (and disable) the token
                    // so we simply ensure that the push notification
                    // status is accurate
                    updateIsPushEnabled();
                }
            })
            .catch(err => {
                console.log("An error occurred while retrieving token. ", err);
                // We failed to retrieve (and disable) the token
                // so we simply ensure that the push notification
                // status is accurate
                updateIsPushEnabled();
            });
    }

    function updateIsPushEnabled() {
        messaging
            .getToken()
            .then(currentToken => {
                if (currentToken) {
                    tokenIsEnabled(currentToken)
                        .then(isEnabled => {
                            setIsPushEnabled(isEnabled);
                        })
                        .catch(() => {
                            setIsPushEnabled(false);
                        });
                } else {
                    console.log("Enable push notifications.");
                    setIsPushEnabled(false);
                }
            })
            .catch(err => {
                console.log("An error occurred while retrieving token. ", err);
                setIsPushEnabled(false);
            });
    }

    // TODO: Include catch statement
    function enableToken(token) {
        return db
            .ref(`push-notification-tokens/${user.uid}`)
            .once("value")
            .then(snap => {
                let tokens = {};

                if (snap) {
                    tokens = {
                        ...snap.val(),
                        [token]: true
                    };
                } else {
                    tokens = {
                        [token]: true
                    };
                }

                return db
                    .ref(`push-notification-tokens/${user.uid}`)
                    .set(tokens);
            });
    }

    // TODO: Include catch statement
    function disableToken(token) {
        return db
            .ref(`push-notification-tokens/${user.uid}`)
            .once("value")
            .then(snap => {
                let tokens = {};

                if (snap) {
                    tokens = {
                        ...snap.val(),
                        [token]: false
                    };
                } else {
                    tokens = {
                        [token]: false
                    };
                }

                return db
                    .ref(`push-notification-tokens/${user.uid}`)
                    .set(tokens);
            });
    }

    function tokenExists(token) {
        return db
            .ref(`push-notification-tokens/${user.uid}/${token}`)
            .once("value")
            .then(snap => {
                if (snap && snap.val() !== null) {
                    return true;
                }
                return false;
            })
            .catch(() => {
                return false;
            });
    }

    function tokenIsEnabled(token) {
        return db
            .ref(`push-notification-tokens/${user.uid}/${token}`)
            .once("value")
            .then(snap => {
                return snap ? snap.val() : false;
            })
            .catch(() => {
                return false;
            });
    }

    return {
        isPushEnabled,
        enablePush,
        disablePush
    };
}

export default usePush;
