import "./HowItWorksSection.css";

const steps = [
  {
    title: "Connect patients instantly",
    description: "Patients join the queue through kiosks, mobile check-in, or front desk registration.",
  },
  {
    title: "AI interprets demand",
    description: "QueueCare analyzes arrival data, wait times, and room availability in real time.",
  },
  {
    title: "Actions are automated",
    description: "The system routes patients, alerts staff, and updates estimated arrival times.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works">
      <div className="section-heading">
        <h2>How QueueCare AI works</h2>
        <p>Effortless operation for clinicians and hospital staff with intelligent automation at every step.</p>
      </div>

      <div className="how-grid">
        {steps.map((step, index) => (
          <article key={step.title} className="how-card">
            <div className="how-card__number">0{index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
