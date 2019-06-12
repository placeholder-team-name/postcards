import React from "react";
import { firebase } from "../../firebase";
import { navigate } from "@reach/router";

import {
    Container,
    Button,
    Heading,
    ScrollView,
    Text
} from "../../components/globals";

const SettingsPage = ({
    isPushEnabled,
    enablePush,
    disablePush,
    isAllowedByBrowser
}) => {
    function handleSignOut() {
        firebase
            .auth()
            .signOut()
            .then(() => navigate("/"));
    }

    function renderPushPermissions() {
        if (isPushEnabled) {
            return (
                <div>
                    <Button onClick={disablePush}>
                        Disable Push Notifications
                    </Button>
                </div>
            );
        }
        if (isAllowedByBrowser) {
            return (
                <div>
                    <Button onClick={enablePush}>
                        Enable Push Notifications
                    </Button>
                </div>
            );
        }

        return (
            <div>
                <Button disabled>Enable Push Notifications</Button>
                <Text>
                    Please enable push notifications in your browser and refresh
                    this page.
                </Text>
            </div>
        );
    }

    return (
        <ScrollView>
            <Container my={12}>
                <Heading as="h1" fontSize={5} mt={0}>
                    Settings
                </Heading>
                {renderPushPermissions()}
                <Container mt={4}></Container>
                <div>
                    <Button onClick={handleSignOut}>Sign out</Button>
                </div>
            </Container>
        </ScrollView>
    );
};

export default SettingsPage;
