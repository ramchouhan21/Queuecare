import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="nav-bar">
      <div className="nav-bar__brand">QueueCare AI</div>
      <nav className="nav-bar__links" aria-label="Primary navigation">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
        <a href="#benefits">Benefits</a>
        <a href="#modules">Hospital modules</a>
        <a href="#ai">AI features</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="nav-bar__actions">
        <a className="nav-button nav-button--ghost" href="/login">Login</a>
        <a className="nav-button nav-button--primary" href="/register">Register</a>
      </div>
    </header>
  );
}
