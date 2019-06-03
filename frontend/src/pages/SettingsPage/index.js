import React from "react";
import { firebase } from "../../firebase";
import { navigate } from "@reach/router";

import {
    Container,
    Button,
    Heading,
    ScrollView
} from "../../components/globals";

const SettingsPage = ({ user }) => {
    function handleSignOut() {
        firebase
            .auth()
            .signOut()
            .then(() => navigate("/"));
    }

    return (
        <ScrollView>
            <Container>
                <Heading as="h1" fontSize={5} mt={12}>
                    Settings
                </Heading>
                <p>Wow do u want push notifications</p>
                <Button onClick={handleSignOut}>Sign out</Button>
            </Container>
        </ScrollView>
    );
};

export default SettingsPage;
