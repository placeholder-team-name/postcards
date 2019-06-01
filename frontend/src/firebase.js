import firebase from "firebase/app";
// TODO: Determine whether these imports are necessary
import "firebase/auth";
import "firebase/messaging";

const config = {
    apiKey: "AIzaSyDh6s4pfA46oy0EGnmRfLkrxSMaaZBYakk",
    authDomain: "info442-postcards.firebaseapp.com",
    databaseURL: "https://info442-postcards.firebaseio.com",
    projectId: "info442-postcards",
    storageBucket: "info442-postcards.appspot.com",
    messagingSenderId: "497984830688",
    appId: "1:497984830688:web:2767b299566f8967"
};
firebase.initializeApp(config);

const db = firebase.database();

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
    "BDF8fVckCf8k3R5-KJX1Xxcqw3qzuKJssbDIvqJ85ktKVF2BAL5bbuciapNAIW2HTcT99eAedUURFqxJrBWtIdQ"
);

export { firebase, db, messaging };
