import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/courses`
        );

        const data = await response.json();

        if (data.success) {
          const formattedCourses = data.courses.map((item) => ({
            ...item,
            id: item._id,
            mode: item.type,
          }));

          setCourses(formattedCourses);
        } else {
          setError("Failed to load courses.");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to connect to backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((item) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      item.title.toLowerCase().includes(searchText) ||
      item.department.toLowerCase().includes(searchText) ||
      item.code.toLowerCase().includes(searchText);

    const modeMatch = mode === "All" || item.mode === mode;

    return searchMatch && modeMatch;
  });

  return (
    <main className="courses-page">
      <div className="page-header">
        <span>ACADEMICS</span>

        <h1>Explore Department Courses</h1>

        <p>
          Select subjects that match your semester curriculum and
          academic goals.
        </p>
      </div>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by course name, department or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="All">All Class Modes</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Online">Online</option>
        </select>
      </div>

      <div className="results-row">
        <h3>
          {loading
            ? "Loading courses..."
            : `${filteredCourses.length} Courses Found`}
        </h3>
      </div>

      <div className="courses-grid">
        {loading ? (
          <div className="no-results">
            <h3>Loading Courses...</h3>
            <p>Please wait while we fetch department subjects.</p>
          </div>
        ) : error ? (
          <div className="no-results">
            <h3>{error}</h3>
            <p>Please make sure the backend server is running.</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="no-results">
            <h3>No courses found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Courses;
