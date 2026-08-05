import { useState, useEffect } from "react";
import { authService } from "./authService";
import "./EmailVerificationPage.css";

export default function EmailVerificationPage() {
  const [status, setStatus] = useState("unknown");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    refreshVerificationStatus();
  }, []);

  const refreshVerificationStatus = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const user = await authService.reloadCurrentUser();
      const verified = user?.emailVerified;
      setStatus(verified ? "verified" : "unverified");
      if (verified) {
        setMessage("Your email is verified. You can continue using QueueCare AI.");
      }
    } catch (reloadError) {
      setError(reloadError?.message || "Unable to refresh verification status.");
      setStatus("unknown");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await authService.sendVerificationEmail();
      setMessage("Verification email has been sent. Check your inbox.");
    } catch (sendError) {
      setError(sendError?.message || "Unable to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verification-page">
      <div className="verification-card" role="main" aria-labelledby="verification-heading">
        <div className="verification-card__header">
          <h1 id="verification-heading">Email verification required</h1>
          <p>We have sent a verification email to your registered address. Please verify your email before continuing.</p>
        </div>

        <div className="verification-status">
          <span className={`verification-pill verification-pill--${status}`}>
            {status === "verified" ? "Verified" : status === "unverified" ? "Unverified" : "Status unknown"}
          </span>
        </div>

        {message && (
          <div className="verification-alert verification-alert--success" role="status" aria-live="polite">
            {message}
          </div>
        )}
        {error && (
          <div className="verification-alert verification-alert--error" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <div className="verification-actions">
          <button className="verification-button" type="button" onClick={handleResend} disabled={loading || status === "verified"}>
            {loading ? "Sending..." : "Resend verification email"}
          </button>
          <button className="verification-button verification-button--secondary" type="button" onClick={refreshVerificationStatus} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh verification status"}
          </button>
        </div>
      </div>
    </div>
  );
}
