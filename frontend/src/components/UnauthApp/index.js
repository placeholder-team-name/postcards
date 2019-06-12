import React from "react";
import { Location, Link } from "@reach/router";

import MainRouter from "../MainRouter";
import { Button } from "../globals";
import NavBar from "../NavBar";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";

function UnauthApp() {
    function renderLoginButton() {
        return (
            <Location>
                {({ location }) => {
                    if (location.pathname !== "/login") {
                        return (
                            <Button as={Link} to="/login">
                                Log in or sign up
                            </Button>
                        );
                    }
                }}
            </Location>
        );
    }

    return (
        <>
            <NavBar>{renderLoginButton()}</NavBar>
            <MainRouter>
                <LandingPage path="/" />
                <LoginPage path="/login" default/>
            </MainRouter>
        </>
    );
}

export default UnauthApp;
