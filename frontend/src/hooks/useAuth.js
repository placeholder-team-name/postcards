import { useState, useEffect } from "react";
import { firebase } from "../firebase";

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email
                });
            } else {
                setUser(null);
                // TODO: Navigate using reach
            }
            setLoading(false);
        });
    }, []);

    return [user, loading];
}

export default useAuth;
