import "./AppointmentCard.css";

export default function AppointmentCard() {
  return (
    <section className="appointment-card" aria-labelledby="appointment-heading">
      <div className="card-header">
        <h2 id="appointment-heading">Upcoming appointment</h2>
      </div>
      <div className="appointment-content">
        <p className="appointment-time">Today, 2:30 PM</p>
        <p className="appointment-location">South Wing · Cardiology · Room 5</p>
        <div className="appointment-notes">
          <p>Doctor: Dr. Javier Lee</p>
          <p>Check in at least 15 minutes early.</p>
        </div>
      </div>
    </section>
  );
}
