import React from "react";
import { Router } from "@reach/router";

import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/NavBar";
import WriteAndPreviewComponent from "./components/WriteAndPreviewComponent";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";
import RecipientsPage from "./pages/RecipientsPage";
import RecipientsNewPage from "./pages/RecipientsNewPage";
import RecipientsDetailPage from "./pages/RecipientsDetailPage";

import useAuth from "./hooks/useAuth";

function App() {
    const [user, loading] = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <NavBar user={user} />
            {user ? (
                <Router>
                    <WriteAndPreviewComponent path="/*" user={user} />
                    <SettingsPage path="/settings" user={user} />
                    <RecipientsPage path="/recipients" user={user} />
                    <RecipientsNewPage path="/recipients/new" user={user} />
                    <RecipientsDetailPage
                        path="/recipients/:recipientID"
                        user={user}
                    />
                </Router>
            ) : (
                <Router>
                    <LandingPage path="/" />
                </Router>
            )}
        </>
    );
}

export default App;
