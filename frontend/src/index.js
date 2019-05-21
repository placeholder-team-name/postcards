import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

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

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
