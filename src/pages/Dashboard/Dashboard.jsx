import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = localStorage.getItem("edutrackUser");
  const user = userData ? JSON.parse(userData) : null;

  const userName = user
    ? `${user.firstName} ${user.lastName}`
    : "Student";

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/enrollments/user/${user.id}`
        );

        const data = await response.json();

        if (data.success) {
          setEnrollments(data.enrollments);
        }
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const totalEnrollments = enrollments.length;
  const underReview = enrollments.filter(
    (item) => item.status === "Under Review"
  ).length;
  const approved = enrollments.filter(
    (item) => item.status === "Approved"
  ).length;
  const completed = enrollments.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <div>
            <span>STUDENT DASHBOARD</span>

            <h1>Welcome back, {userName} 👋</h1>

            <p>Here's an overview of your academic enrollments and progress.</p>

            {user && (
              <small>
                {user.email} {user.rollNumber ? `• Roll No: ${user.rollNumber}` : ""}
              </small>
            )}
          </div>

          <Link to="/courses" className="dashboard-apply">
            Browse Courses
          </Link>
        </div>

        <div className="dashboard-stats">
          <div>
            <span>📚</span>
            <h2>{totalEnrollments}</h2>
            <p>Enrolled Courses</p>
          </div>

          <div>
            <span>⏳</span>
            <h2>{underReview}</h2>
            <p>Under Review</p>
          </div>

          <div>
            <span>⭐</span>
            <h2>{approved}</h2>
            <p>Approved</p>
          </div>

          <div>
            <span>🎉</span>
            <h2>{completed}</h2>
            <p>Completed</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="recent-applications">
            <div className="dashboard-title">
              <h2>Recent Course Enrollments</h2>
              <Link to="/my-enrollments">View All</Link>
            </div>

            {loading ? (
              <div className="application-row">
                <div>
                  <strong>Loading enrollments...</strong>
                  <p>Please wait.</p>
                </div>
              </div>
            ) : enrollments.length === 0 ? (
              <div className="application-row">
                <div>
                  <strong>No courses enrolled yet</strong>
                  <p>Start enrolling in your semester subjects.</p>
                </div>
              </div>
            ) : (
              enrollments.slice(0, 3).map((item) => (
                <div className="application-row" key={item._id}>
                  <div>
                    <strong>{item.course?.title}</strong>
                    <p>{item.course?.department}</p>
                  </div>

                  <span className={`status ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="profile-progress">
            <h2>Student Profile</h2>

            <div className="progress-circle">88%</div>

            <p>Your academic profile is almost complete.</p>

            <Link to="/profile">Update Profile →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function getStatusClass(status) {
  switch (status) {
    case "Approved":
      return "shortlisted";
    case "Under Review":
      return "review";
    case "Completed":
      return "selected";
    case "Dropped":
      return "rejected";
    case "Enrolled":
    default:
      return "applied";
  }
}

export default Dashboard;
