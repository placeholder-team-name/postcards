import React from "react";

import {
    Container,
    Box,
    Button,
    PageLink,
    Heading,
    Flex,
    ScrollView
} from "../../components/globals";
import Icon from "../../components/Icon";
import LoadingSpinner from "../../components/LoadingSpinner";
import useRecipients from "../../hooks/useRecipients";

const RecipientsPage = ({ user }) => {
    const [recipients, loading] = useRecipients(user);

    if (loading) {
        return (
            <ScrollView flex={1} justifyContent="center" alignItems="center">
                <LoadingSpinner type="balls" />
            </ScrollView>
        );
    }

    if (recipients.length === 0) {
        // TODO: Polish empty state
        return (
            <ScrollView>
                <Container>
                    <Heading as="h1" fontSize={5} mt={12}>
                        No Recipients
                    </Heading>
                    <Button to="/recipients/new" as={PageLink} mt={4}>
                        Add recipient
                    </Button>
                </Container>
            </ScrollView>
        );
    }

    return (
        <ScrollView>
            <Container my={12}>
                <Heading as="h1" fontSize={5} mt={0}>
                    Recipients
                </Heading>
                <Button to="/recipients/new" as={PageLink} mt={4}>
                    Add recipient
                </Button>
                <Box mt={8}>
                    {recipients.map((recipient, i) => {
                        const { id, firstName, lastName, email } = recipient;
                        return (
                            <PageLink key={id} to={id}>
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                    py={4}
                                >
                                    <div>
                                        <div>
                                            {`${firstName} ${lastName}`.trim()}
                                        </div>
                                        <div>{`${email}`}</div>
                                    </div>

                                    <Icon glyph="chevron-right" size={24} />
                                </Flex>
                            </PageLink>
                        );
                    })}
                </Box>
            </Container>
        </ScrollView>
    );
};

export default RecipientsPage;
