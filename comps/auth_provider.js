"use client";

import firebase from "../firebase/index";
import { useRouter } from "next/navigation";
const AuthProvider = ({ children }) => {
  const uid = firebase.auth.currentUser;
  const router = useRouter();
  if (!uid) {
    router.push("/signin");
    return null;
  }

  return children;
};

export default AuthProvider;
