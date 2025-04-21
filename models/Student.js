const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
