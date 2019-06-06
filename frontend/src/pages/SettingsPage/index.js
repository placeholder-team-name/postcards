import React from "react";
import { firebase } from "../../firebase";
import { navigate } from "@reach/router";

import {
    Container,
    Button,
    Heading,
    ScrollView
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
                Please enable push notifications in your browser and refresh
                this page.
            </div>
        );
    }

    return (
        <ScrollView>
            <Container>
                <Heading as="h1" fontSize={5} mt={12}>
                    Settings
                </Heading>
                {renderPushPermissions()}
                <div>
                    <Button onClick={handleSignOut}>Sign out</Button>
                </div>
            </Container>
        </ScrollView>
    );
};

export default SettingsPage;
