import { createContext, useContext, useState, useEffect } from "react";

import { auth, db } from "../firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

import { ref, set } from "firebase/database";

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function writeUserData(uid, firstName, lastName) {
    set(ref(db, "users/" + uid), {
      firstname: firstName,
      lastName: lastName,
    });
  }

  const signup = async (email, password, firstName, lastName) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await writeUserData(user.user.uid, firstName, lastName);
    return user;
  };
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          user.admin = idTokenResult.claims.admin;
        });
      }

      setCurrentUser(user);
      setLoading(false);
      console.log(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, loading, signup, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
