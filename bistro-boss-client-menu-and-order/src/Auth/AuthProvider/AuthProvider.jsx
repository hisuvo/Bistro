import { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  // SingUP
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   SignIn / LogIn
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   singOUt
  const singOut = () => {
    return signOut(auth);
  };

  // Auth With Google
  const googleSing = () => {
    return signInWithPopup(auth, provider);
  };

  // Update Profile
  const updateUserProfise = (name, url) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  };

  //   Observer function
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    singOut,
    googleSing,
    updateUserProfise,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
