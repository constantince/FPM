import firebase from "firebase-admin";
import credentials from "./credential.json";

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://<yourproject>.firebaseio.com",
});

//const db = firebase.firestore();

exports default firebase;
