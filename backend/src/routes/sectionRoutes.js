const express = require("express");

const {
    createSection,
    getSections,
    updateSection,
    deleteSection,
} = require("../controllers/sectionController");

const authMiddleware = require("../middlewares/authMiddleware");

const {
    isInstructorOrAdmin,
} = require("../middlewares/roleMiddleware");

const {
    validateSection,
} = require("../validators/sectionValidator");

const router = express.Router();

/*
====================================
Section Routes
====================================
*/

// Create Section
router.post(
    "/courses/:courseId/sections",
    authMiddleware,
    isInstructorOrAdmin,
    validateSection,
    createSection
);

// Get All Sections of a Course
router.get(
    "/courses/:courseId/sections",
    authMiddleware,
    isInstructorOrAdmin,
    getSections
);

// Update Section
router.patch(
    "/sections/:sectionId",
    authMiddleware,
    isInstructorOrAdmin,
    validateSection,
    updateSection
);

// Delete Section
router.delete(
    "/sections/:sectionId",
    authMiddleware,
    isInstructorOrAdmin,
    deleteSection
);

module.exports = router;