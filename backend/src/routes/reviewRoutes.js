const express = require("express");

const {
    createReview,
    getCourseReviews,
    deleteReview,
} = require("../controllers/reviewController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/*
====================================
Review Routes
====================================
*/

// Create Review
router.post(
    "/courses/:courseId",
    authMiddleware,
    createReview
);

// Get Course Reviews
router.get(
    "/courses/:courseId",
    getCourseReviews
);

// Delete Review
router.delete(
    "/:reviewId",
    authMiddleware,
    deleteReview
);

module.exports = router;