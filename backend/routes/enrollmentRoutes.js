const express = require("express");

const {
  enrollCourse,
  getUserEnrollments,
} = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/enroll", enrollCourse);
router.get("/user/:userId", getUserEnrollments);

module.exports = router;
