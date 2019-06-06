import React from "react";

import { ScrollView } from "./components/globals";
import LoadingSpinner from "./components/LoadingSpinner";
import AuthApp from "./components/AuthApp";
import UnauthApp from "./components/UnauthApp";

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

    if (user) {
        return <AuthApp user={user} />;
    }

    return <UnauthApp />;
}

export default App;
