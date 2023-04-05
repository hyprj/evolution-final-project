import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";

export function ProtectedRoute() {
  const { status } = useAuth();

  if (status === "visitor") {
    return <Navigate to="/" />;
  }

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return <Outlet />;
}
