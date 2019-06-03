import React from "react";
import { Router } from "@reach/router";
import styled from "styled-components";

import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/NavBar";
import WriteAndPreviewComponent from "./components/WriteAndPreviewComponent";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";
import RecipientsPage from "./pages/RecipientsPage";
import RecipientsNewPage from "./pages/RecipientsNewPage";
import RecipientsDetailPage from "./pages/RecipientsDetailPage";

import useAuth from "./hooks/useAuth";

const MainRouter = styled(Router)`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

function App() {
    const [user, loading] = useAuth();

    if (loading) {
        return <LoadingSpinner type="circle" />;
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
