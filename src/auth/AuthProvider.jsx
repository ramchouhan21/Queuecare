import { createContext, useEffect, useMemo, useState } from "react";
import { authService } from "./authService";
import { getRoleFromClaims, ROLE_PATIENT } from "./roles";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    status: "loading",
    user: null,
    emailVerified: false,
    role: ROLE_PATIENT,
    roles: [ROLE_PATIENT],
  });

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = authService.onAuthStateChangedListener(async (user) => {
      if (!isMounted) {
        return;
      }

      if (user) {
        try {
          const idTokenResult = await authService.getIdTokenResult(user);
          const role = getRoleFromClaims(idTokenResult.claims);
          setAuthState({
            status: "authenticated",
            user,
            emailVerified: !!user.emailVerified,
            role,
            roles: [role],
          });
        } catch (tokenError) {
          setAuthState({
            status: "authenticated",
            user,
            emailVerified: !!user.emailVerified,
            role: ROLE_PATIENT,
            roles: [ROLE_PATIENT],
          });
        }
      } else {
        setAuthState({
          status: "unauthenticated",
          user: null,
          emailVerified: false,
          role: ROLE_PATIENT,
          roles: [ROLE_PATIENT],
        });
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const contextValue = useMemo(() => authState, [authState]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
