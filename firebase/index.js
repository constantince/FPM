// Import the functions you need from the SDKs
import firebase from "firebase/compat/app";
import VConsole from "vconsole";

const clientCredentials = {
  apiKey: "AIzaSyA-MajJQk5VQmjQ2Mu8wd6UNm4aFpWnQHA",
  authDomain: "podcast-translator-7c103.firebaseapp.com",
  projectId: "podcast-translator-7c103",
  storageBucket: "gs://podcast-translator-7c103.appspot.com",
  messagingSenderId: "541575939150",
  appId: "1:541575939150:web:4d2348390a41066b65af1f",
  measurementId: "G-35CPCYQ5R8",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}
// if (new URL(window.location.href).searchParams.get("eruda") === "1") {
// setTimeout(() => {
//   const vConsole = new VConsole({ theme: "dark" });
// }, 5000);

// }

console.log("firebase font-end initialted...");
export default firebase;
