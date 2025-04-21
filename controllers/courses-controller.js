const {
  ok,
  bad_request,
  server_error,
  error_404,
  created,
} = require("../helpers/responses");
const Course = require("../models/Courses");

module.exports = {
  createCourse: async (req, res) => {
    try {
      const exists = await Course.findOne({ title: req.body.title });
      if (exists) {
        return bad_request(res, "Title already exists.");
      }
      const newCourse = new Course({
        title: req.body.title,
        description: req.body.description,
        instructor: req.body.instructor,
      });

      await newCourse.save();
      return created(res, "Course successfully created");
    } catch (error) {
      console.error("Error creating Course:", error);
      return server_error(res);
    }
  },

  getAllCourses: async (req, res) => {
    try {
      // pagination 5 courses per secilen faqe
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;

      const getAllCourses = await Course.find()
        .select("-students")
        .skip(skip)
        .limit(limit);

      return ok(res, "", getAllCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      return server_error(res);
    }
  },

  getCoursebyID: async (req, res) => {
    try {
      const getCoursebyID = await Course.findById(req.params.id).select(
        "-students"
      );
      return ok(res, "", getCoursebyID);
    } catch (error) {
      return error_404(res);
    }
  },
  updateCourse: async (req, res) => {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          instructor: req.body.instructor,
        },
        { new: true }
      );

      if (!updatedCourse) {
        return error_404(res, "Course not found");
      }

      return ok(res, "Course updated successfully", updatedCourse);
    } catch (error) {
      console.error("Error updating Course:", error);
      return server_error(res);
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);

      if (!deletedCourse) {
        return bad_request(res, "Course not found or could not be deleted");
      }

      return ok(res, "Course deleted successfully", deletedCourse);
    } catch (error) {
      console.error("Error deleting Course:", error);
      return server_error(res);
    }
  },
};
