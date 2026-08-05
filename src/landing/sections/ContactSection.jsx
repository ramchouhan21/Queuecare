import "./ContactSection.css";

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="section-heading">
        <h2>Get in touch</h2>
        <p>Schedule a demo or speak with our team to learn how QueueCare AI can support your hospital.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Talk to sales</h3>
          <p>Reach out for pricing, implementation planning, and partnership details.</p>
          <a className="contact-link" href="mailto:sales@queuecare.ai">sales@queuecare.ai</a>
        </div>

        <div className="contact-card">
          <h3>Support inquiries</h3>
          <p>Need technical information or have questions about onboarding?</p>
          <a className="contact-link" href="mailto:support@queuecare.ai">support@queuecare.ai</a>
        </div>
      </div>
    </section>
  );
}
