import React from "react";
import { PageLink, Box, Text, Flex } from "../globals";

const NavBar = ({ children }) => {
    return (
        <Box px={6} boxShadow="low" height={64}>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                height="100%"
            >
                <Text as={PageLink} to="/" lineHeight="1" fontWeight="bold">
                    Postcards
                </Text>
                {children}
            </Flex>
        </Box>
    );
};

export default NavBar;
