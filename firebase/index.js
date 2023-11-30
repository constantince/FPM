// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-MajJQk5VQmjQ2Mu8wd6UNm4aFpWnQHA",
  authDomain: "podcast-translator-7c103.firebaseapp.com",
  projectId: "podcast-translator-7c103",
  storageBucket: "gs://podcast-translator-7c103.appspot.com",
  messagingSenderId: "541575939150",
  appId: "1:541575939150:web:4d2348390a41066b65af1f",
  measurementId: "G-35CPCYQ5R8",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
console.log(app);
const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence],
});

const db = getFirestore(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default {
  app,
  auth,
  db,
  database,
};
