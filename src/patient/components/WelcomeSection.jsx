import "./WelcomeSection.css";

export default function WelcomeSection() {
  return (
    <section className="welcome-section" aria-labelledby="welcome-heading">
      <div className="welcome-copy">
        <p className="welcome-eyebrow">Welcome back</p>
        <h1 id="welcome-heading">Angela, your care journey is well-managed.</h1>
        <p>Review your queue status, appointments, and arrival details from one central patient hub.</p>
      </div>
      <div className="welcome-details">
        <p>Tip: Download your itinerary so check-in is faster when you arrive at the hospital.</p>
      </div>
    </section>
  );
}
