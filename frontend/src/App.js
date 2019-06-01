import React from "react";
import { Router } from "@reach/router";

import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/NavBar";
import WriteAndPreviewComponent from "./components/WriteAndPreviewComponent";
import LandingPage from "./pages/LandingPage";
import PostcardPage from "./pages/PostcardPage";

import useAuth from "./hooks/useAuth";

function App() {
    const [user, loading] = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <NavBar />
            {user ? (
                <Router>
                    <PostcardPage path="/" user={user} />
                    <WriteAndPreviewComponent path="/editor/*" user={user} />
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
