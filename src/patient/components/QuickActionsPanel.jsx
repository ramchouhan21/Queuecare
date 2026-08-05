import "./QuickActionsPanel.css";

const actions = [
  { label: "View itinerary", icon: "📄" },
  { label: "Contact support", icon: "📞" },
  { label: "Add to calendar", icon: "📅" },
];

export default function QuickActionsPanel() {
  return (
    <section className="quick-actions-panel" aria-labelledby="quick-actions-heading">
      <div className="card-header">
        <h2 id="quick-actions-heading">Quick actions</h2>
      </div>
      <div className="actions-grid">
        {actions.map((action) => (
          <button key={action.label} className="action-button" type="button">
            <span>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
