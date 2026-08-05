import "./FAQSection.css";

const faqs = [
  {
    question: "How quickly can QueueCare AI be deployed?",
    answer: "Most hospitals can begin with a phased rollout in weeks, starting with core queue and patient flow modules.",
  },
  {
    question: "Will the system integrate with my existing hospital workflows?",
    answer: "QueueCare AI is designed to complement clinical workflows and support integration through APIs and secure data exchange.",
  },
  {
    question: "Does the platform support mobile check-in?",
    answer: "Yes. Patients can join waitlists and receive updates from their mobile device or self-service kiosks.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq">
      <div className="section-heading">
        <h2>Frequently asked questions</h2>
        <p>Answers to common questions about deployment, workflows, and patient experience.</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq) => (
          <article key={faq.question} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
