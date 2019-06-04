import React from "react";
import { firebase } from "../../firebase";
import { navigate } from "@reach/router";

import {
    Container,
    Button,
    Heading,
    ScrollView
} from "../../components/globals";

const SettingsPage = ({ isPushEnabled, enablePush, disablePush }) => {
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
                {isPushEnabled ? (
                    <div>
                        <Button onClick={disablePush}>
                            Disable Push Notifications
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button onClick={enablePush}>
                            Enable Push Notifications
                        </Button>
                    </div>
                )}
                <div>
                    <Button onClick={handleSignOut}>Sign out</Button>
                </div>
            </Container>
        </ScrollView>
    );
};

export default SettingsPage;
