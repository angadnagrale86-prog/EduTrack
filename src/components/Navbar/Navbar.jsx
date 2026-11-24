import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("edutrackUser");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("edutrackUser");

    closeMenu();

    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          Edu<span>Track</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/courses" onClick={closeMenu}>
            Courses
          </Link>

          <Link to="/dashboard" onClick={closeMenu}>
            Dashboard
          </Link>

          <Link to="/study" onClick={closeMenu}>
            Study Prep
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          {isLoggedIn && (
            <>
              <Link to="/my-enrollments" onClick={closeMenu}>
                My Enrollments
              </Link>

              <Link to="/profile" onClick={closeMenu}>
                Profile
              </Link>
            </>
          )}

          <div className="mobile-actions">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="mobile-login"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="mobile-register"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                className="mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        <div className="nav-actions">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Get Started
              </Link>
            </>
          ) : (
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        <button
          className={`menu-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "⌃" : "⌄"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
