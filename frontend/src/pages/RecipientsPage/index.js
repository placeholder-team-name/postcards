import React, { useEffect, useState } from "react";

import { Container, Button, PageLink } from "../../components/globals";
import { db } from "../../firebase";
import useRecipients from "../../hooks/useRecipients";

const RecipientsPage = ({ user }) => {
    const [recipients, loading] = useRecipients(user);

    // TODO: Add proper empty state
    return (
        <Container>
            <Button to="/recipients/new" as={PageLink}>
                Add
            </Button>
            {recipients.length > 0 ? (
                recipients.map(recipient => {
                    const { id, firstName, lastName, email } = recipient;
                    return (
                        <div key={id}>
                            <div>{`${firstName} ${lastName}`}</div>
                            <div>{`${email}`}</div>
                            <Button as={PageLink} to={id}>
                                View
                            </Button>
                        </div>
                    );
                })
            ) : (
                <p>No recipients</p>
            )}
        </Container>
    );
};

export default RecipientsPage;
