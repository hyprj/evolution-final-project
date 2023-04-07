import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../features/auth/store";
import { observer } from "mobx-react";

export function ProtectedRoute() {
  const status = authStore.status;

  if (status === "visitor") {
    return <Navigate to="/" />;
  }

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return <Outlet />;
}

export default observer(ProtectedRoute);
