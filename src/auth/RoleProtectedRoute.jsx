import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { hasRole } from "./authRoles";

export default function RoleProtectedRoute({ requiredRole, fallbackPath = "/" }) {
  const auth = useContext(AuthContext);

  if (!auth || auth.status === "loading") {
    return <div>Loading authorization...</div>;
  }

  if (auth.status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (!auth.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (!hasRole(auth, requiredRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
}
