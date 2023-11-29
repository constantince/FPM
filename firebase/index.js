// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA-MajJQk5VQmjQ2Mu8wd6UNm4aFpWnQHA",
    authDomain: "podcast-translator-7c103.firebaseapp.com",
    projectId: "podcast-translator-7c103",
    storageBucket: "gs://podcast-translator-7c103.appspot.com",
    messagingSenderId: "541575939150",
    appId: "1:541575939150:web:4d2348390a41066b65af1f",
    measurementId: "G-35CPCYQ5R8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export default app;