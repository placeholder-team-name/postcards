import React from "react";

import {
    Container,
    Box,
    Button,
    PageLink,
    Heading,
    Flex
} from "../../components/globals";
import Icon from "../../components/Icon";
import LoadingSpinner from "../../components/LoadingSpinner";
import useRecipients from "../../hooks/useRecipients";

const RecipientsPage = ({ user }) => {
    const [recipients, loading] = useRecipients(user);

    if (loading) {
        return (
            <Container>
                <LoadingSpinner type="balls" />
            </Container>
        );
    }

    if (recipients.length === 0) {
        // TODO: Polish empty state
        return (
            <Container>
                <Heading as="h1" fontSize={5} mt={12}>
                    No Recipients
                </Heading>
                <Button to="/recipients/new" as={PageLink} mt={4}>
                    Add recipient
                </Button>
            </Container>
        );
    }

    return (
        <Container>
            <Heading as="h1" fontSize={5} mt={12}>
                Recipients
            </Heading>
            <Button to="/recipients/new" as={PageLink} mt={4}>
                Add recipient
            </Button>
            <Box mt={8}>
                {recipients.map((recipient, i) => {
                    const { id, firstName, lastName, email } = recipient;
                    return (
                        <Flex
                            key={id}
                            as={PageLink}
                            to={id}
                            justifyContent="space-between"
                            py={4}
                        >
                            <div>
                                <div>{`${firstName} ${lastName}`}</div>
                                <div>{`${email}`}</div>
                            </div>

                            <Icon glyph="chevron-right" size={24} />
                        </Flex>
                    );
                })}
            </Box>
        </Container>
    );
};

export default RecipientsPage;
