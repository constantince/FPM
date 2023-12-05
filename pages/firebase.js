import admin from "admin-admin";
import credentials from "./credential.json";

//podcast-translator-7c103.firebaseapp.com
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  // databaseURL: "https://<yourproject>.adminio.com",
});

//const db = admin.firestore();

export default admin;
