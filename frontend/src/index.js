import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import theme from "./theme";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./firebase";

// Based on https://github.com/withspectrum/spectrum/blob/alpha/src/reset.css.js
const GlobalStyle = createGlobalStyle`
    * {
        border: 0;
        box-sizing: inherit;
        -webkit-font-smoothing: auto;
        font-weight: inherit;
        margin: 0;
        outline: 0;
        padding: 0;
        text-decoration: none;
        text-rendering: optimizeLegibility;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    html {
        display: flex;
        box-sizing: border-box;
        font-size: 16px;
        line-height: 1.5;
        -webkit-font-smoothing: auto;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    }

    body {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    #root {
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
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

serviceWorker.register();
