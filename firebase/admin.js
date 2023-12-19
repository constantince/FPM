import admin from "firebase-admin";
import {
  initializeApp,
  applicationDefault,
  getApp,
  firestore,
  credential,
} from "firebase-admin/app";
import credentials from "./credential.json";

//podcast-translator-7c103.firebaseapp.com
// console.log("app name::", getApp().name);
if (!admin.apps.length) {
  initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "podcast-translator-7c103.firebaseapp.com",
  });
}

export default admin;
