import { Link } from "react-router-dom";
import "./CourseCard.css";

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="card-top">
        <div className="company-logo">
          {course.department.charAt(0)}
        </div>

        <span className="mode-badge">{course.mode}</span>
      </div>

      <h3>{course.title}</h3>
      <p className="company-name">{course.department}</p>

      <div className="card-info">
        <span>📘 {course.code}</span>
        <span>🎓 {course.credits}</span>
        <span>⏱ {course.duration}</span>
      </div>

      <div className="skills">
        {course.skills.slice(0, 3).map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <Link
        to={`/course/${course.id}`}
        className="details-btn"
      >
        View Details
      </Link>
    </div>
  );
}

export default CourseCard;
