import "./NotificationsPanel.css";

const notifications = [
  { title: "Check-in reminder", message: "Your appointment starts in 30 minutes.", type: "info" },
  { title: "Queue update", message: "Your position moved to 3rd in line.", type: "success" },
  { title: "Preparation note", message: "Please bring your insurance card to the registration desk.", type: "notice" },
];

export default function NotificationsPanel() {
  return (
    <section className="notifications-panel" aria-labelledby="notifications-heading">
      <div className="card-header">
        <h2 id="notifications-heading">Notifications</h2>
      </div>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.title} className={`notification-card notification-card--${notification.type}`}>
            <p className="notification-card__title">{notification.title}</p>
            <p className="notification-card__message">{notification.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
