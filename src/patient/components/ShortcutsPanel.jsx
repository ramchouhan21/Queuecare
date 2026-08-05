import "./ShortcutsPanel.css";

const shortcuts = [
  { title: "Search hospital services", description: "Find locations, specialties, and amenities before you arrive." },
  { title: "Browse departments", description: "View department details and waiting area guidance." },
];

export default function ShortcutsPanel() {
  return (
    <section className="shortcuts-panel" aria-labelledby="shortcuts-heading">
      <div className="card-header">
        <h2 id="shortcuts-heading">Shortcuts</h2>
      </div>
      <div className="shortcut-list">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.title} className="shortcut-card">
            <h3>{shortcut.title}</h3>
            <p>{shortcut.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
