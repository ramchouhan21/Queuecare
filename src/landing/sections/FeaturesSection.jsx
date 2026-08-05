import "./FeaturesSection.css";

const features = [
  {
    title: "Intelligent queue orchestration",
    description: "Automatically prioritize patients based on acuity, appointment type, and real-time wait conditions.",
  },
  {
    title: "Staff workload balancing",
    description: "Reduce bottlenecks by aligning available clinicians with incoming demand and service capacity.",
  },
  {
    title: "Patient engagement workflows",
    description: "Keep patients informed with status updates, ETA alerts, and virtual check-in tools.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features">
      <div className="section-heading">
        <h2>Features designed for modern care teams</h2>
        <p>QueueCare AI is built to improve patient flow without adding complexity to clinical workflows.</p>
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
