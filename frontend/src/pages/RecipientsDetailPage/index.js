import React from "react";

import { Container, Heading, Text } from "../../components/globals";
import LoadingSpinner from "../../components/LoadingSpinner";

import useRecipientsDetail from "../../hooks/useRecipientsDetail";

const RecipientsDetailPage = ({ user, recipientID }) => {
    const [recipientsDetail, loading] = useRecipientsDetail(user, recipientID);

    // TODO: Make sure users can only access their own recipients
    if (loading) {
        return <LoadingSpinner type="balls" />;
    }

    if (recipientsDetail) {
        const { firstName, lastName, email } = recipientsDetail;

        return (
            <Container>
                <Heading as="h1" fontSize={5} mt={12}>
                    {`${firstName} ${lastName}`}
                </Heading>
                <Text as="span">{email}</Text>
            </Container>
        );
    }

    // TODO: Redirect user to a 404 page
    return <Container>Oops...</Container>;
};

export default RecipientsDetailPage;
