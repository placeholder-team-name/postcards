import { useState } from "react";
import { db } from "../firebase";

// TODO: Error handling?
function useRecipientsDetail(user) {
    const [recipientsDetail, setRecipientsDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    function fetchRecipientsDetail(recipientID) {
        db.ref(`recipients/${user.uid}/${recipientID}`).once("value", snap => {
            setLoading(true);
            const value = snap.val();
            if (value) {
                setRecipientsDetail(value);
            }
            setLoading(false);
        });
    }

    return {
        loading,
        recipientsDetail,
        fetchRecipientsDetail
    };
}

export default useRecipientsDetail;
