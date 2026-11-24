const SavedCourse = require("../models/SavedCourse");

// Save course
const saveCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Student ID and Course ID are required",
      });
    }

    const existingSaved = await SavedCourse.findOne({
      user: userId,
      course: courseId,
    });

    if (existingSaved) {
      return res.status(400).json({
        success: false,
        message: "Course is already saved",
      });
    }

    const savedCourse = await SavedCourse.create({
      user: userId,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Course saved successfully ❤️",
      savedCourse,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save course",
    });
  }
};

// Get saved courses
const getSavedCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    const savedCourses = await SavedCourse.find({
      user: userId,
    })
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: savedCourses.length,
      savedCourses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch saved courses",
    });
  }
};

// Remove saved course
const removeSavedCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const deleted = await SavedCourse.findOneAndDelete({
      user: userId,
      course: courseId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Saved course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course removed from saved list",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to remove course",
    });
  }
};

module.exports = {
  saveCourse,
  getSavedCourses,
  removeSavedCourse,
};
