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

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return console.error("user exesited...");
  }
  // creat a user collection
  const userInfo = user.providerData[0];
  const docData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    provider: userInfo.providerId,
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
    body: JSON.stringify({ idToken, csrfToken: 1000 }), // Convert JavaScript object to JSON string
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
    e.preventDefault();
    // return fetch("/api/cookie_test");

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("please fill the email and password");
      return;
    }
    router.push("/loading");
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
      <Link
        className="text-black rounded-l-md my-10 py-2 hover:text-blue px-3"
        href="/signin"
      >
        <div className="flex flex-row align-middle">
          <svg
            className="w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <p className="ml-2">Back</p>
        </div>
      </Link>
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
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            title="email format not correct"
          />
          <input
            type="password"
            name="password"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            placeholder="Password"
            pattern="[a-zA-Z0-9]{8,}"
            title="password length must more than 8 chartesz"
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
