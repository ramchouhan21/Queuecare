import { ROLE_PATIENT, ROLES } from "./roles";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

export function useAuthRole() {
  const auth = useContext(AuthContext);
  const role = auth?.role || ROLE_PATIENT;
  const roles = auth?.roles || [ROLE_PATIENT];

  return {
    role,
    roles,
    isAuthenticated: auth?.status === "authenticated",
    isEmailVerified: auth?.emailVerified === true,
  };
}

export function hasRole(auth, requiredRole) {
  if (!auth?.roles) {
    return false;
  }
  return auth.roles.includes(requiredRole);
}

export function isPatient(auth) {
  return hasRole(auth, ROLE_PATIENT);
}

export function isDoctor(auth) {
  return hasRole(auth, ROLE_DOCTOR);
}

export function isReceptionist(auth) {
  return hasRole(auth, ROLE_RECEPTIONIST);
}

export function isAdministrator(auth) {
  return hasRole(auth, ROLE_ADMINISTRATOR);
}
