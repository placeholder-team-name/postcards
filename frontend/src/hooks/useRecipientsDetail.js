import { useState, useEffect } from "react";
import { db } from "../firebase";

// TODO: Error handling?
function useRecipientsDetail(user, recipientID, isEditing) {
    const [recipientsDetail, setRecipientsDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recipientsDetailRef = db.ref(
            `recipients/${user.uid}/${recipientID}`
        );
        recipientsDetailRef.on("value", snap => {
            const value = snap.val();
            if (value) {
                setRecipientsDetail(value);
            }
            setLoading(false);
        });

        return () => {
            recipientsDetailRef.off();
        };
    }, [user.uid, recipientID, isEditing]);

    return [recipientsDetail, loading];
}

export default useRecipientsDetail;
