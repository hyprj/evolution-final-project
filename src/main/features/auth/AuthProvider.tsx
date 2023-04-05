import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { logOut } from "../../firebase/firebase";
import { firebaseAuth } from "../../firebase/firebase";

interface User {
  displayName: string | null;
  email: string | null;
  uid: string;
}

interface AuthContextValue {
  status: "visitor" | "loggedIn" | "loading";
  user: User | null;
  signOut: () => void;
  setStatus: React.Dispatch<React.SetStateAction<AuthContextValue["status"]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");

  const signOut = () => {
    setUser(null);
    setStatus("visitor");
    logOut();
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const authUser = {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
        };
        setUser({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
        setStatus("loggedIn");
      } else {
        setStatus("visitor");
      }
    });
    return () => unsubscribe();
  }, []);

  const authContextValue: AuthContextValue = {
    status,
    user,
    signOut,
    setUser,
    setStatus,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
