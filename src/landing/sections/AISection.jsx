import "./AISection.css";

const aiFeatures = [
  { title: "Predictive queuing", description: "Forecast arrivals and dynamically optimize patient flow." },
  { title: "Smart routing", description: "Route patients to the right resource based on condition and capacity." },
  { title: "Automated alerts", description: "Notify staff and patients instantly when priorities shift." },
];

export default function AISection() {
  return (
    <section id="ai">
      <div className="section-heading">
        <h2>AI features that support smarter care</h2>
        <p>QueueCare AI combines clinical operational intelligence with practical workflows.</p>
      </div>

      <div className="ai-grid">
        {aiFeatures.map((feature) => (
          <article key={feature.title} className="ai-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
