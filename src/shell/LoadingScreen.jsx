import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true"></div>
      <p>Loading QueueCare AI...</p>
    </div>
  );
}
