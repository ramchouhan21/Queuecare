import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>
        <p>Page not found. The requested route does not exist.</p>
        <a className="notfound-button" href="/app/home">Return home</a>
      </div>
    </div>
  );
}
