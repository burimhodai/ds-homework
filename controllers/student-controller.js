const {
  ok,
  bad_request,
  server_error,
  error_404,
  created,
} = require("../helpers/responses");
const Student = require("../models/Student");

module.exports = {
  createStudent: async (req, res) => {
    try {
      const { name, email } = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return bad_request(res, "Invalid email format.");
      }
      const exists = await Student.findOne({ email: req.body.email });
      if (exists) {
        return bad_request(res, "Email already in use.");
      }
      const newStudent = new Student({ name, email });

      await newStudent.save();
      return created(res, "Student successfully created");
    } catch (error) {
      console.error("Error creating student:", error);
      return server_error(res);
    }
  },

  getAllStudents: async (req, res) => {
    try {
      // pagination 5 courses per secilen faqe
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;

      const getAllStudents = await Student.find()
        .select("-courses")
        .skip(skip)
        .limit(limit);
      return ok(res, "", getAllStudents);
    } catch (error) {
      return error_404(res);
    }
  },

  getStudentbyID: async (req, res) => {
    try {
      const getStudentbyID = await Student.findById(req.params.id).select(
        "-courses"
      );
      return ok(res, "", getStudentbyID);
    } catch (error) {
      return error_404(res);
    }
  },
  updateStudent: async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          email: req.body.email,
        },
        { new: true }
      );

      if (!updatedStudent) {
        return error_404(res, "Student not found");
      }

      return ok(res, "Student updated successfully", updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
      return server_error(res);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);

      if (!deletedStudent) {
        return bad_request(res, "Student not found or could not be deleted");
      }

      return ok(res, "Student deleted successfully", deletedStudent);
    } catch (error) {
      console.error("Error deleting student:", error);
      return server_error(res);
    }
  },
};
