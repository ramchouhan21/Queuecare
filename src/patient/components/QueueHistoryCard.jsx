import "./QueueHistoryCard.css";

const history = [
  { date: "Jul 18", location: "Cardiology", status: "Completed" },
  { date: "Jul 05", location: "Radiology", status: "Waiting" },
  { date: "Jun 28", location: "Laboratory", status: "Completed" },
];

export default function QueueHistoryCard() {
  return (
    <section className="queue-history-card" aria-labelledby="history-heading">
      <div className="card-header">
        <h2 id="history-heading">Queue history</h2>
        <p>Recent care episodes and service status for your hospital visits.</p>
      </div>
      <div className="history-table" role="table" aria-label="Queue history table">
        <div className="history-row history-row--header" role="row">
          <span role="columnheader">Date</span>
          <span role="columnheader">Department</span>
          <span role="columnheader">Status</span>
        </div>
        {history.map((entry) => (
          <div key={`${entry.date}-${entry.location}`} className="history-row" role="row">
            <span role="cell">{entry.date}</span>
            <span role="cell">{entry.location}</span>
            <span role="cell">{entry.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
