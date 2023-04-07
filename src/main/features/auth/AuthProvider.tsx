import React, { useEffect } from "react";
import { firebaseAuth } from "../../services/firebase";
import { authStore } from "./store";
import { getUserBalance } from "../../services/db";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const balance = await getUserBalance(user.uid);
        const { displayName, uid, email } = user;
        authStore.setUser({ displayName, uid, email, balance });
      } else {
        authStore.status = "visitor";
      }
    });
    return () => unsubscribe();
  }, []);

  return <>{children} </>;
}
