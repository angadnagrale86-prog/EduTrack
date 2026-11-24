import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(data.message || "Password reset link sent successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-icon">🔐</div>
        <span className="forgot-label">ACCOUNT RECOVERY</span>
        <h1>Forgot your password?</h1>
        <p className="forgot-description">
          Enter your registered student email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="forgot-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-btn">
            Send Reset Link <span>→</span>
          </button>
        </form>

        {message && <div className="forgot-success">✓ {message}</div>}
        {error && <div className="forgot-error">⚠ {error}</div>}

        <div className="back-login">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
