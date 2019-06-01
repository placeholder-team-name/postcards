import React, { useEffect, useState } from "react";
import { Container } from "../../components/globals";
import { db } from "../../firebase";

const RecipientsPage = ({ user }) => {
    const [recipients, setRecipients] = useState([]);

    useEffect(() => {
        db.ref(`contacts/${user.uid}`)
            .once("value")
            .then(function(snapshot) {
                if (snapshot.val()) {
                    // TODO: Set recipients
                }
            });
    }, []);

    // TODO: Add proper empty state
    return (
        <Container>
            <p>I'm a recipients page</p>
            {recipients.length > 0 ? <p>Contacts</p> : <p>No recipients</p>}
        </Container>
    );
};

export default RecipientsPage;
