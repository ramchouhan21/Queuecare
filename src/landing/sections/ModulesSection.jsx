import "./ModulesSection.css";

const modules = [
  { title: "Patient Intake", description: "Centralized registration, queue check-in, and status tracking for every patient." },
  { title: "Staff Coordination", description: "Assign care teams, manage shifts, and route patients efficiently." },
  { title: "Real-Time Visibility", description: "Live dashboards for wait times, room use, and throughput performance." },
];

export default function ModulesSection() {
  return (
    <section id="modules">
      <div className="section-heading">
        <h2>Hospital modules overview</h2>
        <p>Designed for the unique needs of hospitals, outpatient clinics, and emergency departments.</p>
      </div>

      <div className="modules-grid">
        {modules.map((module) => (
          <article key={module.title} className="module-card">
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
