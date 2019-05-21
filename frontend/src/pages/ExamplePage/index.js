import React from "react";
import { Flex } from "grid-styled";

import { Heading, Text } from "../../components/globals";

const ExamplePage = () => {
    return (
        <Flex>
            <Heading as="h1">Example Page</Heading>
            <Text as="p">Lorem ipsum dolor sit amet.</Text>
        </Flex>
    );
};

export default ExamplePage;
