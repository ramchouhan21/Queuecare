import DashboardOverview from "./components/DashboardOverview";
import WelcomeSection from "./components/WelcomeSection";
import AppointmentCard from "./components/AppointmentCard";
import QueueStatusCard from "./components/QueueStatusCard";
import QueueHistoryCard from "./components/QueueHistoryCard";
import NotificationsPanel from "./components/NotificationsPanel";
import QuickActionsPanel from "./components/QuickActionsPanel";
import ShortcutsPanel from "./components/ShortcutsPanel";
import ProfileSummaryCard from "./components/ProfileSummaryCard";
import "./PatientDashboard.css";

export default function PatientDashboard() {
  return (
    <div className="patient-dashboard">
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <WelcomeSection />
          <DashboardOverview />
          <div className="dashboard-panels">
            <AppointmentCard />
            <QueueStatusCard />
          </div>
          <QueueHistoryCard />
          <NotificationsPanel />
        </div>

        <aside className="dashboard-sidebar">
          <ProfileSummaryCard />
          <QuickActionsPanel />
          <ShortcutsPanel />
        </aside>
      </div>
    </div>
  );
}
