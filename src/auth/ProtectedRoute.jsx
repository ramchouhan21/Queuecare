import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function ProtectedRoute() {
  const auth = useContext(AuthContext);

  if (!auth || auth.status === "loading") {
    return <div>Loading authentication status...</div>;
  }

  if (auth.status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (!auth.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <Outlet />;
}
