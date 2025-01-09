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
import useAxiosPublice from "../../hooks/useAxiosPublice";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublice = useAxiosPublice();

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
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client side
        const userInfo = { email: currentUser.email };
        await axiosPublice.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("Access-token", res.data.token);
          }
        });
      } else {
        // remove jwt token from cilent side
        // (If can do store token ) it can do many way Likes : httpOnly, localstroge, cashing, in memory
        localStorage.removeItem("Access-token");
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, [axiosPublice]);

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
