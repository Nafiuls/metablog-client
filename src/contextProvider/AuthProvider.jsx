import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //   google provider
  const provider = new GoogleAuthProvider();

  //   register a user
  const handleRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   login a user with email pass
  const handleSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   google signin
  const handleGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  //   update user profile
  const manageProfile = async (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    })
      .then(() => {
        setUser((user) => ({
          ...user,
          displayName: name,
          photoURL: image,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   log out a user
  const handleLogout = () => {
    signOut(auth);
  };

  //   observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
      console.log("current user---->", currentUser);
      return () => {
        unsubscribe();
      };
    });
  }, []);
  const data = {
    user,
    setUser,
    loading,
    handleRegister,
    handleSignIn,
    handleGoogle,
    manageProfile,
    handleLogout,
  };

  return <authContext.Provider value={data}>{children}</authContext.Provider>;
};

export default AuthProvider;
