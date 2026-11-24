const dns = require("dns");

// MongoDB Atlas DNS resolution
dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const savedCourseRoutes = require("./routes/savedCourseRoutes");

const app = express();

/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());
app.use(express.json());

/* =========================================
   MONGODB CONNECTION
========================================= */

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/saved-courses", savedCourseRoutes);

/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EduTrack Student Management Backend is running 🚀",
  });
});

/* =========================================
   SERVER
========================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EduTrack Backend running on port ${PORT}`);
});
