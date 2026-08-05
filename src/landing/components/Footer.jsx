import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">QueueCare AI</div>
      <div className="footer__links">
        <a href="#features">Features</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </div>
      <p className="footer__copy">© 2026 QueueCare AI. Built for secure healthcare operations.</p>
    </footer>
  );
}
