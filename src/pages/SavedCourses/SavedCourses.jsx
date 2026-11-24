import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import "./SavedCourses.css";

function SavedCourses() {
  const [savedCourses, setSavedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSavedCourses = async () => {
      try {
        const userData = localStorage.getItem("edutrackUser");

        if (!userData) {
          setMessage("Please login to view saved courses.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/saved-courses/user/${user.id}`
        );

        const data = await response.json();

        if (data.success) {
          const formattedCourses = data.savedCourses
            .filter((item) => item.course)
            .map((item) => ({
              ...item.course,
              id: item.course._id,
              mode: item.course.type,
            }));

          setSavedCourses(formattedCourses);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.error(error);
        setMessage("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCourses();
  }, []);

  return (
    <main className="saved-page">
      <div className="simple-header">
        <span>BOOKMARKED</span>
        <h1>Saved Courses</h1>
        <p>Keep your shortlisted electives and subjects within easy reach.</p>
      </div>

      <div className="saved-grid">
        {loading ? (
          <div className="no-results">
            <h3>Loading Saved Courses...</h3>
            <p>Please wait.</p>
          </div>
        ) : message ? (
          <div className="no-results">
            <h3>{message}</h3>
          </div>
        ) : savedCourses.length > 0 ? (
          savedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="no-results">
            <h3>No Saved Courses</h3>
            <p>Save a course to see it here.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default SavedCourses;
