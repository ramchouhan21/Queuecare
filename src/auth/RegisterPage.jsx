import { useState } from "react";
import { authService } from "./authService";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return false;
    }
    const phoneValue = phone.replace(/\s+/g, "");
    const phonePattern = /^\+?[0-9]{8,15}$/;
    if (!phonePattern.test(phoneValue)) {
      setError("Please enter a valid phone number with country code.");
      return false;
    }
    if (!password) {
      setError("Please enter a password.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!acceptedTerms) {
      setError("You must accept the terms to continue.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await authService.signUpWithEmail(email, password);
      if (userCredential.user) {
        await authService.updateUserProfile({ displayName: fullName });
      }
      // Registration succeeded; next steps are handled by the application shell.
    } catch (registrationError) {
      const message = registrationError?.message || "Unable to create your account. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card" role="main" aria-labelledby="register-heading">
        <div className="register-card__header">
          <h1 id="register-heading">Create your QueueCare AI account</h1>
          <p>Register securely for staff access to patient queue management and care coordination.</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="register-form__error" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <div className="register-field">
            <label htmlFor="register-fullname">Full name</label>
            <input
              id="register-fullname"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Dr. Maya Patel"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@hospital.org"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-phone">Phone number</label>
            <input
              id="register-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+1 555 123 4567"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-password">Password</label>
            <div className="password-input-group">
              <input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a secure password"
                required
                minLength={8}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="register-confirm-password">Confirm password</label>
            <input
              id="register-confirm-password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Re-enter your password"
              required
              minLength={8}
            />
          </div>

          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              required
            />
            I agree to the terms and conditions.
          </label>

          <button className="register-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register account"}
          </button>
        </form>
      </div>
    </div>
  );
}
