import { useState, useEffect } from "react";
import { db } from "../firebase";

function useRecipients(user) {
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recipientsRef = db.ref(`recipients/${user.uid}`);
        recipientsRef.on("value", snap => {
            let recipients = [];
            snap.forEach(childSnap => {
                recipients = [...recipients, childSnap.val()];
            });
            setRecipients(recipients);
            setLoading(false);
        });

        return () => {
            recipientsRef.off();
        };
    }, [user]);

    return [recipients, loading];
}

export default useRecipients;
