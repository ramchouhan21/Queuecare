import { useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

const segmentLabels = {
  app: "App",
  home: "Home",
  queue: "Queue",
  patients: "Patients",
  notes: "Notes",
  "check-in": "Check-in",
  appointments: "Appointments",
  settings: "Settings",
  team: "Team",
};

export function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {segments.map((segment, index) => {
          const label = segmentLabels[segment] || segment;
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          return (
            <li key={path}>
              <a href={path}>{label}</a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
