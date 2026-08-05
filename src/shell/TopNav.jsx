import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import "./TopNav.css";

export function TopNav({ role }) {
  const auth = useContext(AuthContext);

  return (
    <header className="top-nav">
      <div className="top-nav__title">QueueCare AI</div>
      <div className="top-nav__meta">
        <span className="top-nav__role">{role.toUpperCase()}</span>
        <span className="top-nav__user">{auth?.user?.email || "Guest"}</span>
      </div>
    </header>
  );
}
