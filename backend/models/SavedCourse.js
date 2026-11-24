const mongoose = require("mongoose");

const savedCourseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Same course ko same student dobara save na kar sake
savedCourseSchema.index(
  { user: 1, course: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "SavedCourse",
  savedCourseSchema
);
