import React from "react";

import { Heading, Container, Measure, Text } from "../../components/globals";

const LandingPage = () => {
    return (
        <Container>
            <Heading as="h1" fontSize={6} mt={12}>
                Take your family with you.
            </Heading>
            <Measure textAlign="center" mt={6}>
                <Text>
                    Aenean quis lacinia tellus. Nulla bibendum est eu tortor
                    tempus ultricies quis ac turpis. Etiam lorem magna, sodales
                    in condimentum quis, dignissim sit amet urna. Nunc quis
                    tristique augue.
                </Text>
            </Measure>
        </Container>
    );
};

export default LandingPage;
