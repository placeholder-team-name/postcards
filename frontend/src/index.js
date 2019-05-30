import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import { Helmet } from "react-helmet";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import theme from "./theme";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

let firebaseConfig = {
    apiKey: "AIzaSyDh6s4pfA46oy0EGnmRfLkrxSMaaZBYakk",
    authDomain: "info442-postcards.firebaseapp.com",
    databaseURL: "https://info442-postcards.firebaseio.com",
    projectId: "info442-postcards",
    storageBucket: "info442-postcards.appspot.com",
    messagingSenderId: "497984830688",
    appId: "1:497984830688:web:2767b299566f8967"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const GlobalStyle = createGlobalStyle`
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
    }
`;

ReactDOM.render(
    <>
        <GlobalStyle />
        <Helmet>
            <meta charSet="utf-8" />
            <title>Postcards</title>
        </Helmet>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </>,
    document.getElementById("root")
);

serviceWorker.unregister();
