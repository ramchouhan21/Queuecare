import { useMemo } from "react";
import { useAuthRole } from "../auth/authRoles";
import { SidebarNavigation } from "./SidebarNavigation";
import { TopNav } from "./TopNav";
import { Breadcrumbs } from "./Breadcrumbs";
import "./AppShell.css";

export default function AppShell({ children }) {
  const { role } = useAuthRole();

  const navItems = useMemo(() => {
    const base = [
      { label: "Home", path: "/app/home" },
      { label: "Queue overview", path: "/app/queue" },
    ];

    const doctor = [
      { label: "Patient rounds", path: "/app/patients" },
      { label: "Clinical notes", path: "/app/notes" },
    ];

    const receptionist = [
      { label: "Check-in desk", path: "/app/check-in" },
      { label: "Appointment desk", path: "/app/appointments" },
    ];

    const admin = [
      { label: "Admin settings", path: "/app/settings" },
      { label: "Team management", path: "/app/team" },
    ];

    switch (role) {
      case "doctor":
        return [...base, ...doctor];
      case "receptionist":
        return [...base, ...receptionist];
      case "administrator":
        return [...base, ...admin];
      case "patient":
      default:
        return [...base];
    }
  }, [role]);

  return (
    <div className="app-shell">
      <SidebarNavigation navItems={navItems} role={role} />
      <div className="app-shell__main">
        <TopNav role={role} />
        <div className="app-shell__content">
          <Breadcrumbs />
          <div className="app-shell__page">{children}</div>
        </div>
      </div>
    </div>
  );
}
