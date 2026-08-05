import "./QueueStatusCard.css";

export default function QueueStatusCard() {
  return (
    <section className="queue-status-card" aria-labelledby="queue-status-heading">
      <div className="card-header">
        <h2 id="queue-status-heading">Active queue status</h2>
      </div>
      <div className="queue-status-content">
        <p className="queue-status-value">3rd in line</p>
        <p className="queue-status-detail">Estimated arrival: 14 minutes</p>
        <div className="queue-status-meta">
          <span>Department: General Medicine</span>
          <span>Desk: Reception 2</span>
        </div>
      </div>
    </section>
  );
}
