const express = require("express");

const {
    createCourse,
    updateCourse,
    updateThumbnail,
    publishCourse,
    unpublishCourse,
    deleteCourse,
    getInstructorCourses,
    getSingleCourse,
} = require("../controllers/courseController");

const authMiddleware = require("../middlewares/authMiddleware");
const {isInstructorOrAdmin} = require("../middlewares/roleMiddleware");
const {validateUpdateCourse} = require("../validators/courseValidator");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

/*
====================================
Course Routes
====================================
*/

// Create Course
router.post(
    "/",
    authMiddleware,
    isInstructorOrAdmin,
    createCourse
);

// Get My Courses
router.get(
    "/my-courses",
    authMiddleware,
    isInstructorOrAdmin,
    getInstructorCourses
);

// Get Single Course
router.get(
    "/:courseId",
    authMiddleware,
    isInstructorOrAdmin,
    getSingleCourse
);

// Update Course
router.patch(
    "/:courseId",
    authMiddleware,
    isInstructorOrAdmin,
    validateUpdateCourse,
    updateCourse
);

// Upload Thumbnail
router.patch(
    "/:courseId/thumbnail",
    authMiddleware,
    isInstructorOrAdmin,
    upload.single("thumbnail"),
    updateThumbnail
);

// Publish Course
router.patch(
    "/:courseId/publish",
    authMiddleware,
    isInstructorOrAdmin,
    publishCourse
);

// Unpublish Course
router.patch(
    "/:courseId/unpublish",
    authMiddleware,
    isInstructorOrAdmin,
    unpublishCourse
);

// Delete Course
router.delete(
    "/:courseId",
    authMiddleware,
    isInstructorOrAdmin,
    deleteCourse
);

module.exports = router;