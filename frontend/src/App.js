import React, { useEffect } from "react";
import { Router } from "@reach/router";
import styled from "styled-components";

import LoadingSpinner from "./components/LoadingSpinner";
import { ScrollView } from "./components/globals";
import NavBar from "./components/NavBar";
import WriteAndPreviewComponent from "./components/WriteAndPreviewComponent";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";
import RecipientsPage from "./pages/RecipientsPage";
import RecipientsNewPage from "./pages/RecipientsNewPage";
import RecipientsDetailPage from "./pages/RecipientsDetailPage";

import useAuth from "./hooks/useAuth";
import usePushNotifications from "./hooks/usePushNotifications";

const MainRouter = styled(Router)`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

function App() {
    const [user, loading] = useAuth();
    const [pushIsEnabled, requestPermission] = usePushNotifications(user);

    useEffect(() => {
        console.log("IM THE APPS EFFECT");
        if (!loading && user) {
            requestPermission();
        }
    }, [user, loading, requestPermission]);

    if (loading) {
        return (
            <ScrollView flex={1} justifyContent="center" alignItems="center">
                <LoadingSpinner type="circle" />
            </ScrollView>
        );
    }

    return (
        <>
            <NavBar user={user} />
            {user ? (
                <MainRouter>
                    <WriteAndPreviewComponent path="/*" user={user} />
                    <SettingsPage path="/settings" user={user} />
                    <RecipientsPage path="/recipients" user={user} />
                    <RecipientsNewPage path="/recipients/new" user={user} />
                    <RecipientsDetailPage
                        path="/recipients/:recipientID"
                        user={user}
                    />
                </MainRouter>
            ) : (
                <MainRouter>
                    <LandingPage path="/" />
                </MainRouter>
            )}
        </>
    );
}

export default App;
