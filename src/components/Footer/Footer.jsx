import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Edu<span>Track</span>
          </Link>

          <p>
            Empowering students with organized course management, academic
            tracking, and study preparation resources.
          </p>

          <div className="footer-contact">
            <a href="mailto:support@edutrack.edu" className="contact-link">
              📧 support@edutrack.edu
            </a>

            <a href="tel:+919421329709" className="contact-link">
              📞 +91 94213 29709
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Nagpur+Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              📍 Nagpur, Maharashtra, India
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>

          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/study">Study Preparation</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-column">
          <h3>For Students</h3>

          <Link to="/dashboard">Dashboard</Link>
          <Link to="/my-enrollments">My Enrollments</Link>
          <Link to="/saved">Saved Courses</Link>
          <Link to="/profile">My Profile</Link>
          <Link to="/records">Documents</Link>
        </div>

        <div className="footer-column">
          <h3>Account</h3>

          <Link to="/login">Login</Link>
          <Link to="/register">Create Account</Link>

          <div className="footer-tag">
            <span>✓</span>
            <p>Verified Student Portal</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 EduTrack Student Management System. All rights reserved.</p>

        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>

        <p>Built for academic excellence 🚀</p>
      </div>
    </footer>
  );
}

export default Footer;
