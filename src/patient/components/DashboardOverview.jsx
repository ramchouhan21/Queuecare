import "./DashboardOverview.css";

const overviewItems = [
  { label: "Current position", value: "3rd in line" },
  { label: "Estimated wait", value: "14 min" },
  { label: "Visits this month", value: "2" },
  { label: "Next appointment", value: "Today at 2:30 PM" },
];

export default function DashboardOverview() {
  return (
    <section className="overview-card" aria-labelledby="overview-heading">
      <div className="overview-header">
        <h2 id="overview-heading">Dashboard overview</h2>
      </div>
      <div className="overview-grid">
        {overviewItems.map((item) => (
          <div key={item.label} className="overview-item">
            <p className="overview-item__label">{item.label}</p>
            <p className="overview-item__value">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
