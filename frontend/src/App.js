import React from "react";

import { ScrollView } from "./components/globals";
import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/NavBar";
import AuthApp from "./components/AuthApp";
import MainRouter from "./components/MainRouter";
import LandingPage from "./pages/LandingPage";

import useAuth from "./hooks/useAuth";

function App() {
    const [user, loading] = useAuth();

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
                <AuthApp user={user} />
            ) : (
                <MainRouter>
                    <LandingPage path="/" />
                </MainRouter>
            )}
        </>
    );
}

export default App;
