import React, { useEffect, useState } from "react";

import { Container, Button, PageLink } from "../../components/globals";
import { db } from "../../firebase";
import useRecipients from "../../hooks/useRecipients";

const RecipientsPage = ({ user }) => {
    const [recipients, loading] = useRecipients(user);

    console.log(recipients);
    // TODO: Add proper empty state
    return (
        <Container>
            <p>I'm a recipients page</p>
            <Button to="/recipients/new" as={PageLink}>
                Add
            </Button>
            {recipients.length > 0 ? <p>Contacts</p> : <p>No recipients</p>}
        </Container>
    );
};

export default RecipientsPage;
