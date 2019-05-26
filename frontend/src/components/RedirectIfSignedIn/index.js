import React from "react";
import { Redirect } from "@reach/router";

const RedirectIfSignedIn = ({ children, auth }) => {
    if (auth) {
        return <Redirect to="/" noThrow />;
    }
    return <>{children}</>;
};

export default RedirectIfSignedIn;
