import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within the AuthProvider.");
  }
  return auth;
}
