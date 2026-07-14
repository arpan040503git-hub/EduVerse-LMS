const asyncHandler = require("../handlers/asyncHandler");

const {
    createReviewService,
    getCourseReviewsService,
    deleteReviewService,
} = require("../services/reviewService");

const createReview = asyncHandler(async (req, res) => {
    const review = await createReviewService(
        req.params.courseId,
        req.user._id,
        req.body
    );

    res.status(201).json({
        success: true,
        message: "Review added successfully.",
        review,
    });
});

const getCourseReviews = asyncHandler(async (req, res) => {
    const reviews = await getCourseReviewsService(
        req.params.courseId
    );

    res.status(200).json({
        success: true,
        count: reviews.length,
        reviews,
    });
});

const deleteReview = asyncHandler(async (req, res) => {
    await deleteReviewService(
        req.params.reviewId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Review deleted successfully.",
    });
});

module.exports = {
    createReview,
    getCourseReviews,
    deleteReview,
};