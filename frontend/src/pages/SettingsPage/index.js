import React from "react";
import { firebase } from "../../firebase";
import { navigate } from "@reach/router";

import {
    Container,
    Button,
    Heading,
    ScrollView
} from "../../components/globals";

import usePushNotifications from "../../hooks/usePushNotifications";

const SettingsPage = ({ user }) => {
    const [
        pushIsEnabled,
        requestPermission,
        deleteToken
    ] = usePushNotifications(user);

    function handleSignOut() {
        firebase
            .auth()
            .signOut()
            .then(() => navigate("/"));
    }

    console.log(deleteToken);
    return (
        <ScrollView>
            <Container>
                <Heading as="h1" fontSize={5} mt={12}>
                    Settings
                    {`asd ${pushIsEnabled}`}
                </Heading>
                <button onClick={() => deleteToken()}>Delete</button>
                <p>Wow do u want push notifications</p>
                <Button onClick={handleSignOut}>Sign out</Button>
            </Container>
        </ScrollView>
    );
};

export default SettingsPage;
