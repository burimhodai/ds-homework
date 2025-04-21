const router = require("express").Router();
const enrollmentController = require("../controllers/enroll-controller");

router.post("/:id", enrollmentController.enrollStudent);
router.delete("/:id", enrollmentController.unEnrollStudent);
router.get("/courses-of/:id", enrollmentController.getStudentCourses);
router.get("/students-of/:id", enrollmentController.getCourseStudents);

module.exports = router;
