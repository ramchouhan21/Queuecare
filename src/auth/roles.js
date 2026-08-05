export const ROLE_PATIENT = "patient";
export const ROLE_DOCTOR = "doctor";
export const ROLE_RECEPTIONIST = "receptionist";
export const ROLE_ADMINISTRATOR = "administrator";

export const ROLES = [
  ROLE_PATIENT,
  ROLE_DOCTOR,
  ROLE_RECEPTIONIST,
  ROLE_ADMINISTRATOR,
];

export const ROLE_LABELS = {
  [ROLE_PATIENT]: "Patient",
  [ROLE_DOCTOR]: "Doctor",
  [ROLE_RECEPTIONIST]: "Receptionist",
  [ROLE_ADMINISTRATOR]: "Administrator",
};

export function isRole(value) {
  return ROLES.includes(value);
}

export function getRoleFromClaims(claims = {}) {
  const roleClaim = claims.role;
  if (typeof roleClaim === "string" && isRole(roleClaim)) {
    return roleClaim;
  }
  return ROLE_PATIENT;
}
