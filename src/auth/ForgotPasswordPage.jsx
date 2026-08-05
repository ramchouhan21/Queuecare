import { useState } from "react";
import { authService } from "./authService";
import "./ForgotPasswordPage.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authService.sendPasswordReset(email);
      setSuccessMessage(
        "If an account exists for this email, a password reset link has been sent."
      );
    } catch (resetError) {
      const message =
        resetError?.message || "Unable to send password reset email. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card" role="main" aria-labelledby="forgot-password-heading">
        <div className="forgot-password-card__header">
          <h1 id="forgot-password-heading">Reset your password</h1>
          <p>Enter the email address associated with your QueueCare AI account.</p>
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="forgot-password-form__alert forgot-password-form__alert--error" role="alert" aria-live="assertive">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="forgot-password-form__alert forgot-password-form__alert--success" role="status" aria-live="polite">
              {successMessage}
            </div>
          )}

          <div className="forgot-password-field">
            <label htmlFor="forgot-password-email">Email address</label>
            <input
              id="forgot-password-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@hospital.org"
              required
            />
          </div>

          <button className="forgot-password-button" type="submit" disabled={loading}>
            {loading ? "Sending reset email..." : "Send password reset email"}
          </button>
        </form>
      </div>
    </div>
  );
}
