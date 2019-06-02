import React from "react";
import { Flex } from "grid-styled";
import { PageLink, Container, Box, Text, Avatar, Button } from "../globals";

const NavBar = ({ user }) => {
    return (
        <Box bg="white" boxShadow="low" py={4} position="relative" px={6}>
            {user ? (
                <Flex justifyContent="space-between" alignItems="center">
                    <Text as={PageLink} to="/" lineHeight="1" fontWeight="bold">
                        Postcards
                    </Text>
                    <Flex alignItems="center">
                        <Button>Save</Button>
                        <Button>Review</Button>
                        <PageLink to="/settings">
                            <Avatar src={user.photoURL} size={32} />
                        </PageLink>
                    </Flex>
                </Flex>
            ) : (
                <Flex>
                    <Text as={PageLink} to="/" lineHeight="1" fontWeight="bold">
                        Postcards
                    </Text>
                </Flex>
            )}
        </Box>
    );
};

export default NavBar;
