const {
  ok,
  bad_request,
  server_error,
  error_404,
  created,
} = require("../helpers/responses");
const Course = require("../models/Courses");
const Student = require("../models/Student");

module.exports = {
  enrollStudent: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return error_404(res);
      }

      if (course.students.includes(req.body.id)) {
        return bad_request(res, "Student is already enrolled in this course.");
      }

      const courseAssign = await Course.findByIdAndUpdate(req.params.id, {
        $push: {
          students: req.body.id,
        },
      });
      if (!courseAssign) {
        return error_404(res);
      }

      const studentEnroll = await Student.findByIdAndUpdate(req.body.id, {
        $push: {
          courses: req.params.id,
        },
      });
      if (!studentEnroll) {
        return error_404(res);
      }

      ok(res);
    } catch (error) {
      console.log(error);
      server_error(res);
    }
  },

  unEnrollStudent: async (req, res) => {
    try {
      const courseUnAssign = await Course.findByIdAndUpdate(req.params.id, {
        $pull: {
          students: req.body.id,
        },
      });
      if (!courseUnAssign) {
        return error_404(res);
      }

      const studentUnEnroll = await Student.findByIdAndUpdate(req.body.id, {
        $pull: {
          courses: req.params.id,
        },
      });
      if (!studentUnEnroll) {
        return error_404(res);
      }

      ok(res);
    } catch (error) {
      console.log(error);
      server_error(res);
    }
  },

  getStudentCourses: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id).populate({
        path: "courses",
        select: "title",
      });
      if (!student) {
        return error_404(res);
      }

      ok(res, student.courses);
    } catch (error) {
      console.log(error);
      server_error(res);
    }
  },

  getCourseStudents: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate({
        path: "students",
        select: "name",
      });
      if (!course) {
        return error_404(res);
      }

      ok(res, course.students);
    } catch (error) {
      console.log(error);
      server_error(res);
    }
  },
};
