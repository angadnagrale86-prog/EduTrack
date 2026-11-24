const express = require("express");

const {
  saveCourse,
  getSavedCourses,
  removeSavedCourse,
} = require("../controllers/savedCourseController");

const router = express.Router();

router.post("/save", saveCourse);
router.get("/user/:userId", getSavedCourses);
router.delete("/remove", removeSavedCourse);

module.exports = router;
