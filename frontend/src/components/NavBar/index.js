import React from "react";

import { Box, Text } from "../globals";

const NavBar = () => {
    return (
        <Box boxShadow="low" px={8} py={4}>
            <Text as="span" lineHeight="1" fontWeight="bold">
                Postcards
            </Text>
        </Box>
    );
};

export default NavBar;
