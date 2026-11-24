import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./CourseDetails.css";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/courses/${id}`
        );

        const data = await response.json();

        if (data.success) {
          const item = data.course;

          setCourse({
            ...item,
            id: item._id,
            mode: item.type,
          });
        } else {
          setCourse(null);
        }
      } catch (error) {
        console.error(error);
        setMessage("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    const userData = localStorage.getItem("edutrackUser");

    if (!userData) {
      alert("Please login before enrolling.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    try {
      setMessage("Submitting enrollment...");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/enrollments/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            courseId: course.id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("Course enrolled successfully 🎉");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server.");
    }
  };

  const handleSave = async () => {
    const userData = localStorage.getItem("edutrackUser");

    if (!userData) {
      alert("Please login before saving a course.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    try {
      setMessage("Saving course...");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/saved-courses/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            courseId: course.id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("Course saved successfully ❤️");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server.");
    }
  };

  if (loading) {
    return (
      <div className="not-found">
        <h2>Loading Course...</h2>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="not-found">
        <h2>Course Not Found</h2>
        <Link to="/courses">Back to Courses</Link>
      </div>
    );
  }

  return (
    <main className="details-page">
      <div className="details-header">
        <div className="details-logo">
          {course.department.charAt(0)}
        </div>

        <div>
          <span>COURSE SYLLABUS</span>
          <h1>{course.title}</h1>
          <p>{course.department}</p>
        </div>
      </div>

      <div className="details-layout">
        <div className="details-main">
          <section>
            <h2>About the Course</h2>
            <p>{course.description}</p>
            <p>
              Students will complete theory lectures, laboratory assignments,
              and internal assessments as per university guidelines.
            </p>
          </section>

          <section>
            <h2>Key Topics & Skills</h2>
            <div className="detail-skills">
              {course.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section>
            <h2>Course Outcomes</h2>
            <ul>
              <li>Understand core theoretical foundations.</li>
              <li>Complete practical lab experiments and assignments.</li>
              <li>Maintain minimum 75% attendance requirement.</li>
              <li>Qualify in mid-semester and end-semester exams.</li>
            </ul>
          </section>
        </div>

        <aside className="details-sidebar">
          <div className="job-summary">
            <h3>Course Overview</h3>

            <div>
              <strong>📘 Subject Code</strong>
              <p>{course.code}</p>
            </div>

            <div>
              <strong>🏫 Class Mode</strong>
              <p>{course.mode}</p>
            </div>

            <div>
              <strong>🎓 Credits</strong>
              <p>{course.credits}</p>
            </div>

            <div>
              <strong>⏱ Duration</strong>
              <p>{course.duration}</p>
            </div>

            <button className="apply-btn" onClick={handleEnroll}>
              Enroll Now
            </button>

            <button className="save-btn" onClick={handleSave}>
              ♡ Save Course
            </button>

            {message && (
              <p className="application-message">{message}</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default CourseDetails;
