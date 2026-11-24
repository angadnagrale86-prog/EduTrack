import { useEffect, useState } from "react";
import "./MyEnrollments.css";

function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const userData = localStorage.getItem("edutrackUser");

        if (!userData) {
          setMessage("Please login to view your enrollments.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/enrollments/user/${user.id}`
        );

        const data = await response.json();

        if (data.success) {
          setEnrollments(data.enrollments);
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

    fetchEnrollments();
  }, []);

  return (
    <main className="enrollments-page">
      <div className="simple-header">
        <span>MY ACADEMICS</span>
        <h1>My Course Enrollments</h1>
        <p>Track all your enrolled semester subjects in one place.</p>
      </div>

      <div className="enrollments-card">
        {loading ? (
          <div className="enrollment-item">
            <div>
              <h3>Loading Enrollments...</h3>
              <p>Please wait while we fetch your enrolled courses.</p>
            </div>
          </div>
        ) : message ? (
          <div className="enrollment-item">
            <div>
              <h3>{message}</h3>
            </div>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="enrollment-item">
            <div>
              <h3>No Enrollments Yet</h3>
              <p>Enroll in a course to see it here.</p>
            </div>
          </div>
        ) : (
          enrollments.map((item) => (
            <div className="enrollment-item" key={item._id}>
              <div>
                <h3>{item.course?.title}</h3>
                <p>
                  {item.course?.department} ({item.course?.code})
                </p>
              </div>

              <span
                className={`application-status ${item.status
                  .replace(" ", "-")
                  .toLowerCase()}`}
              >
                {item.status}
              </span>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default MyEnrollments;
