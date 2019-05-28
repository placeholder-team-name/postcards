import React from "react";

import { Container, Box, Text } from "../globals";

const NavBar = () => {
    return (
        <Box boxShadow="low" py={4}>
            <Container>
                <Text as="span" lineHeight="1" fontWeight="bold">
                    Postcards
                </Text>
            </Container>
        </Box>
    );
};

export default NavBar;
