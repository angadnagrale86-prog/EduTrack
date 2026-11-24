import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      setMessage("Password reset successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="reset-page">
      <div className="reset-card">
        <div className="reset-icon">🔑</div>
        <span className="reset-label">ACCOUNT SECURITY</span>
        <h1>Reset Password</h1>
        <p className="reset-description">
          Create a new password for your EduTrack account.
        </p>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="reset-input-group">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="reset-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="reset-submit-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
            {!loading && <span>→</span>}
          </button>
        </form>

        {message && <div className="reset-success">✓ {message}</div>}
        {error && <div className="reset-error">⚠ {error}</div>}

        <div className="reset-back">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
