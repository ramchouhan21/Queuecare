import "./SidebarNavigation.css";

export function SidebarNavigation({ navItems, role }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">QueueCare AI</div>
      <div className="sidebar__role">Role: {role}</div>
      <nav className="sidebar__nav" aria-label="App navigation">
        {navItems.map((item) => (
          <a key={item.path} href={item.path} className="sidebar__link">
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
