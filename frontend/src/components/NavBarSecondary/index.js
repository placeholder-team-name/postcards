import React from "react";
import { Box, Text, Container, Button } from "../globals";

const NavBarSecondary = ({ user }) => {
    return (
        <Box
            bg="white"
            py={4}
            borderTop="1px solid #EFEFF4"
            borderBottom="1px solid #EFEFF4"
            position="relative"
            px={6}
        >
            I'm a secondary toolbar... Editor tools go here
        </Box>
    );
};

export default NavBarSecondary;
