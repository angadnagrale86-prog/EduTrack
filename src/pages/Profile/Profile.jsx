import { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rollNumber: "",
    email: "",
    phone: "",
    department: "",
    semester: "",
    skills: "",
    linkedin: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = localStorage.getItem("edutrackUser");

        if (!userData) {
          setMessage("Please login first.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/profile/${user.id}`
        );

        const data = await response.json();

        if (data.success) {
          setFormData({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            rollNumber: data.user.rollNumber || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            department: data.user.department || "",
            semester: data.user.semester || "",
            skills: data.user.skills || "",
            linkedin: data.user.linkedin || "",
          });
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

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = localStorage.getItem("edutrackUser");

      if (!userData) {
        setMessage("Please login first.");
        return;
      }

      const user = JSON.parse(userData);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("Student profile updated successfully 🎉");

        localStorage.setItem(
          "edutrackUser",
          JSON.stringify(data.user)
        );
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
      <main className="profile-page">
        <div className="profile-card">
          <h2>Loading Student Profile...</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {formData.firstName
            ? formData.firstName.charAt(0).toUpperCase()
            : "S"}
        </div>

        <div>
          <span>STUDENT RECORD</span>
          <h1>My Profile</h1>
          <p>Manage your personal, academic, and department details.</p>
        </div>
      </div>

      <div className="profile-card">
        <h2>Student Information</h2>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Roll Number</label>
            <input
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="e.g. CE2026001"
            />
          </div>

          <div>
            <label>Email</label>
            <input type="email" value={formData.email} disabled />
          </div>

          <div>
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Computer Engineering"
            />
          </div>

          <div>
            <label>Current Semester</label>
            <input
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              placeholder="Semester 6"
            />
          </div>

          <div className="full">
            <label>Technical Skills</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="HTML, CSS, JavaScript, React, Node.js"
            />
          </div>

          <div className="full">
            <label>LinkedIn / GitHub Profile</label>
            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://github.com/your-username"
            />
          </div>

          <div className="full">
            <button type="submit" className="save-profile">
              Save Changes
            </button>
          </div>

          {message && (
            <p className="profile-message">{message}</p>
          )}
        </form>
      </div>
    </main>
  );
}

export default Profile;
