'use client';

import React, {useState, createContext, useEffect, useContext} from "react";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import firebase from '../firebase/index';


const AuthContext = createContext({user: {}, isLoding: false, error: null});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // listen for auth state changes
    onAuthStateChanged(firebaae.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user);
        // ...
      } else {
        setUser({empty: true});
        setIsLoading(true);
        setError(null);
        console.log("user has been sign out")
      }
    });
  }, []);



  // if not authenticated, render Login
  if (!user) return <h1>loading...</h1>;
  
  return <AuthContext.Provider value={{user, isLoding, error}}>
    {props.children}
  </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


export default AuthContextProvider;