"use client";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
import "../../firebase/index";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import Link from "next/link";
import { useRouter } from "next/navigation";

const auth = getAuth();
const db = getFirestore();
// import firebaseui from "firebaseui";
// setPersistence(auth, inMemoryPersistence);
const setSessionToken = async (userCredential, redirectUrl) => {
  const user = userCredential;
  // get idtoken
  const idToken = await user.getIdToken();

  const docRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return console.error("user exesited...");
  }
  // creat a user collection
  const userInfo = user.providerData[0];
  const docData = {
    id: user.uid,
    displayName: userInfo.displayName,
    email: userInfo.email,
    photoURL: userInfo.photoURL,
    emailVerified: user.emailVerified,
    subscription: [],
    vip: 0,
    createdTime: serverTimestamp(),
  };

  // create new user doc
  await setDoc(docRef, docData);

  // fetch a request to set http cookie
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Assuming JSON data in the request body
      // Add any other headers as needed
    },
    body: JSON.stringify({ idToken, csrfToken: 1000, vip: 0 }), // Convert JavaScript object to JSON string
  };

  console.log("url fetched...", fetchOptions);
  await fetch("/api/session_signup", fetchOptions);

  // A page redirect would suffice as the persistence is set to NONE.
  // await auth.signOut();

  window.location.replace(redirectUrl);
};

const SingUp = () => {
  const router = useRouter();

  const onSubmit = (e) => {
    router.push("/loading");
    e.preventDefault();
    // return fetch("/api/cookie_test");

    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSessionToken(userCredential.user, "/profile");
        router.back();
        // ...
      })
      .catch((error) => {
        router.back();
        const errorCode = error.code;
        const errorMessage = error.message;
        // if (errorCode === "auth/email-already-in-use") {
        alert(errorMessage);
        // }
        console.log(
          "google login error: code",
          errorCode,
          " message:",
          errorMessage,
        );
        // ..
      });
  };

  return (
    <div className="max-w-[280px] mx-auto">
      <div className="flex flex-col items-center mt-[10vh]">
        <h2 className="mb-5 text-gray-900 font-mono font-bold text-xl">
          Sign Up Now
        </h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            name="password"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            placeholder="Password"
          />
          <button className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
