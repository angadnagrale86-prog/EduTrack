import { Link } from "react-router-dom";
import courses from "../../data/courses";
import CourseCard from "../../components/CourseCard/CourseCard";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-tag">SMART STUDENT MANAGEMENT PORTAL</span>

            <h1>
              Manage Your Academics
              <span> With Ease And Clarity</span>
            </h1>

            <p>
              Enroll in semester courses, monitor your academic progress,
              manage your student profile, and access structured exam
              preparation resources in one place.
            </p>

            <div className="hero-buttons">
              <Link to="/courses" className="primary-btn">
                Explore Courses →
              </Link>

              <Link to="/register" className="secondary-btn">
                Student Registration
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="floating-card">
              <span>🎓</span>
              <div>
                <strong>Academic Growth</strong>
                <p>Track your semester progress</p>
              </div>
            </div>

            <div className="hero-dashboard">
              <div className="dashboard-circle">88%</div>
              <h3>Attendance & Profile</h3>
              <p>You're on track for semester exams!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div>
            <h2>50+</h2>
            <p>Courses</p>
          </div>
          <div>
            <h2>12+</h2>
            <p>Departments</p>
          </div>
          <div>
            <h2>2K+</h2>
            <p>Students</p>
          </div>
          <div>
            <h2>95%</h2>
            <p>Pass Rate</p>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span>ACADEMIC CATALOG</span>
            <h2>Featured Courses</h2>
          </div>

          <Link to="/courses">View All →</Link>
        </div>

        <div className="internship-grid">
          {courses.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="why-content">
          <span>WHY EDUTRACK?</span>
          <h2>Everything You Need for Student Management</h2>
          <p>
            EduTrack brings course enrollment, attendance tracking,
            student records, and exam preparation into one simple platform.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-box">
            <div>📚</div>
            <h3>Course Enrollment</h3>
            <p>Browse department subjects and enroll in semester courses.</p>
          </div>

          <div className="feature-box">
            <div>📊</div>
            <h3>Track Progress</h3>
            <p>Monitor all your enrolled courses and approval statuses.</p>
          </div>

          <div className="feature-box">
            <div>🎯</div>
            <h3>Exam Preparation</h3>
            <p>Prepare for viva, practicals, and university exams smoothly.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
