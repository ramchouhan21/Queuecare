import "./ProfileSummaryCard.css";

const profile = {
  name: "Angela Martinez",
  patientId: "P-0142",
  nextVisit: "Jul 18 · 2:30 PM",
  doctor: "Dr. Javier Lee",
};

export default function ProfileSummaryCard() {
  return (
    <section className="profile-summary-card" aria-labelledby="profile-summary-heading">
      <div className="profile-summary-header">
        <h2 id="profile-summary-heading">Profile summary</h2>
      </div>
      <div className="profile-summary-content">
        <p className="profile-name">{profile.name}</p>
        <p className="profile-id">Patient ID: {profile.patientId}</p>
        <div className="profile-details">
          <div>
            <p className="profile-label">Next visit</p>
            <p>{profile.nextVisit}</p>
          </div>
          <div>
            <p className="profile-label">Primary care</p>
            <p>{profile.doctor}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
