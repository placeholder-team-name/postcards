import React from "react";
import { Flex } from "grid-styled";
import { PageLink, Container, Box, Text, Avatar } from "../globals";

const NavBar = ({ user }) => {
    return (
        <Box boxShadow="low" py={4}>
            <Container>
                {user ? (
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text
                            as={PageLink}
                            to="/"
                            lineHeight="1"
                            fontWeight="bold"
                        >
                            Postcards
                        </Text>
                        <Flex alignItems="center">
                            <Text as={PageLink} to="/recipients" lineHeight="1">
                                Recipients
                            </Text>
                            <PageLink to="/settings">
                                <Avatar src={user.photoURL} size={32} />
                            </PageLink>
                        </Flex>
                    </Flex>
                ) : (
                    <Flex>
                        <Text
                            as={PageLink}
                            to="/"
                            lineHeight="1"
                            fontWeight="bold"
                        >
                            Postcards
                        </Text>
                    </Flex>
                )}
            </Container>
        </Box>
    );
};

export default NavBar;
