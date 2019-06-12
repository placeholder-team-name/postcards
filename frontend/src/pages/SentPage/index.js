import React from "react";
import { Link } from "@reach/router";
import { Heading, Text, Measure, Container, Button } from "../../components/globals";

const SentPage = () => {
    return (
        <Container mt={12}>
        <Measure mt={6}>
            <Heading as="h1">Sent! </Heading>
            <Text as="p">Your postcard has been sent. Click below to write again. </Text>
            <Container mt={4}></Container>
            <Button as={Link} to="/">
                Postcards
            </Button>
        </Measure>
        </Container>
    );
};

export default SentPage;
