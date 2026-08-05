import "./BenefitsSection.css";

const benefits = [
  {
    title: "Reduce wait times",
    description: "Accelerate patient throughput with AI-driven prioritization and staffing alignment.",
  },
  {
    title: "Improve patient satisfaction",
    description: "Deliver timely updates and reduce uncertainty for every patient journey.",
  },
  {
    title: "Increase operational efficiency",
    description: "Free clinical staff from manual queue decisions and let the system optimize care flow.",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits">
      <div className="section-heading">
        <h2>Benefits for care teams and patients</h2>
        <p>QueueCare AI helps hospitals operate more safely, predictably, and with a better experience for everyone.</p>
      </div>

      <div className="benefit-grid">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="benefit-card">
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
