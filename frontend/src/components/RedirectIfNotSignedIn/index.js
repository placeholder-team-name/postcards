import React from "react";
import { Redirect } from "@reach/router";

const RedirectIfNotSignedIn = ({ auth, to, children }) => {
    if (!auth) {
        return <Redirect to={to} noThrow />;
    }
    return <>{children}</>;
};

export default RedirectIfNotSignedIn;
