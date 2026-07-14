const express = require("express");

const {
    getPublishedCourses,
    getSinglePublishedCourse,
    searchCourses,
    filterCourses,
} = require("../controllers/publicCourseController");

const router = express.Router();

/*
====================================
Public Course Routes
====================================
*/

// Get All Published Courses
router.get("/", getPublishedCourses);

// Search Courses
router.get("/search", searchCourses);

// Filter Courses
router.get("/filter", filterCourses);

// Get Single Published Course
router.get("/:courseId", getSinglePublishedCourse);

module.exports = router;