import { useState, useEffect } from "react";
import { db } from "../firebase";

function useRecipientsDetail(user, recipientID) {
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
    }, [recipientID]);

    return [recipientsDetail, loading];
}

export default useRecipientsDetail;
