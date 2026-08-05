import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function AuthLoader() {
  const auth = useContext(AuthContext);

  if (!auth || auth.status === "loading") {
    return (
      <div className="auth-loader" aria-live="polite">
        Checking authentication status...
      </div>
    );
  }

  return null;
}
