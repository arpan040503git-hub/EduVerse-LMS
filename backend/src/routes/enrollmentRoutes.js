const express = require("express");

const {
    enrollCourse,
    getMyEnrollments,
    getEnrollment,
    updateProgress,
} = require("../controllers/enrollmentController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/*
====================================
Enrollment Routes
====================================
*/

// Enroll in Course
router.post(
    "/courses/:courseId",
    authMiddleware,
    enrollCourse
);

// Get My Enrollments
router.get(
    "/my-courses",
    authMiddleware,
    getMyEnrollments
);

// Get Single Enrollment
router.get(
    "/:enrollmentId",
    authMiddleware,
    getEnrollment
);

// Update Progress
router.patch(
    "/:enrollmentId/progress",
    authMiddleware,
    updateProgress
);

module.exports = router;