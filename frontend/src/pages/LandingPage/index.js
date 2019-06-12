import React from "react";
import { Link } from "@reach/router";

import {
    Heading,
    Container,
    Measure,
    Text,
    Button,
    ScrollView
} from "../../components/globals";

const LandingPage = () => {
    return (
        <ScrollView>
            <Container my={12}>
                <Heading as="h1" fontSize={6} mt={0}>
                    Take your family with you.
                </Heading>
                <Measure mt={6}>
                    <Text>
                        College students lack the time and energy to keep their family updated.
                        Their family can follow them on social media. Unfortunately, the content their
                        loved one posts on there is not always an accurate reflection of life.
                    </Text>
                </Measure>
                <Measure mt={6}>
                    <Text>
                        Add to your postcard throughout the month.
                        At the end of every month, students can send the postcard to their family members
                        and start on next month's update. The student's family members will feel closer to them.
                    </Text>
                </Measure>
                <Measure mt={6}>
                    <Text fontWeight="bold">
                        Before, they only heard from their loved one approximately every half year. Now, they
                        hear about their highs, lows, and day-to-day every month.
                    </Text>
                </Measure>
                <Measure mt={6}>
                    <Button as={Link} to="/login">
                        Log in with Google
                    </Button>
                </Measure>
            </Container>
        </ScrollView>
    );
};

export default LandingPage;
