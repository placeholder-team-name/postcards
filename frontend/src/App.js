import React from "react";
import { Router } from "@reach/router";

import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import PostcardPage from "./pages/PostcardPage";
import useAuth from "./hooks/useAuth";

const NotFound = () => <p>Sorry, nothing here</p>;

function App() {
    const [user, loading] = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <NavBar />
            <Router>
                {user ? (
                    <PostcardPage path="/" user={user} />
                ) : (
                    <LandingPage path="/" />
                )}
                <NotFound default />
            </Router>
        </>
    );
}

export default App;
