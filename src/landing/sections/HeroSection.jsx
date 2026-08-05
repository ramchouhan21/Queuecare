import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Healthcare operations reimagined</p>
          <h1>QueueCare AI brings intelligent patient flow to modern hospitals.</h1>
          <p>
            Streamline check-in, reduce wait times, and empower staff with predictive queue management and clinical workflow intelligence.
          </p>
          <div className="hero-actions">
            <a className="hero-button hero-button--primary" href="/register">Start free trial</a>
            <a className="hero-button hero-button--secondary" href="/login">Request demo</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-card">
            <span className="hero-chip">AI triage</span>
            <div className="hero-card__content">
              <h2>Patient flow dashboard</h2>
              <p>Real-time wait times, smart prioritization, and capacity planning.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
