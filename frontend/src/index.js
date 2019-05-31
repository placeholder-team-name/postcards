import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import theme from "./theme";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./firebase";

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
