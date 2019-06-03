import React from "react";
import { Container } from "../../components/globals";
import useRecipientsDetail from "../../hooks/useRecipientsDetail";

const RecipientsDetailPage = ({ user, recipientID }) => {
    const [recipientsDetail, loading] = useRecipientsDetail(user, recipientID);

    // TODO: Security. Make sure people can't see arbitrary users

    if (loading) {
        return <div>Loading...</div>;
    } else {
        if (recipientsDetail) {
            return <div>{recipientsDetail.firstName}</div>;
        } else {
            return <div>Oops</div>;
        }
    }
};

export default RecipientsDetailPage;
