import React, { useEffect, useState } from "react";

import {
    Container,
    Box,
    Button,
    PageLink,
    Heading,
    Flex
} from "../../components/globals";
import { db } from "../../firebase";
import Icon from "../../components/Icon";
import useRecipients from "../../hooks/useRecipients";

const RecipientsPage = ({ user }) => {
    const [recipients, loading] = useRecipients(user);

    // TODO: Add proper empty state
    return (
        <Container>
            <Heading as="h1" fontSize={5} mt={12}>
                Recipients
            </Heading>
            <Button to="/recipients/new" as={PageLink} mt={4}>
                Add recipient
            </Button>

            {recipients.length > 0 ? (
                <Box mt={8}>
                    {recipients.map((recipient, i) => {
                        const { id, firstName, lastName, email } = recipient;
                        return (
                            <Flex
                                key={id}
                                justifyContent="space-between"
                                py={4}
                            >
                                <div>
                                    <div>{`${firstName} ${lastName}`}</div>
                                    <div>{`${email}`}</div>
                                </div>

                                <PageLink to={id}>
                                    <Icon glyph="chevron-right" size={24} />
                                </PageLink>
                            </Flex>
                        );
                    })}
                </Box>
            ) : (
                <p>No recipients</p>
            )}
        </Container>
    );
};

export default RecipientsPage;
