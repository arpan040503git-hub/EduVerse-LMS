const Review = require("../models/Review");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const ApiError = require("../utils/ApiError");

const createReviewService = async (
    courseId,
    studentId,
    reviewData
) => {
    const { rating, comment } = reviewData;

    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found.");
    }

    const enrollment = await Enrollment.findOne({
        student: studentId,
        course: courseId,
    });

    if (!enrollment) {
        throw new ApiError(
            403,
            "Enroll in the course before reviewing."
        );
    }

    const alreadyReviewed = await Review.findOne({
        student: studentId,
        course: courseId,
    });

    if (alreadyReviewed) {
        throw new ApiError(
            409,
            "You have already reviewed this course."
        );
    }

    const review = await Review.create({
        student: studentId,
        course: courseId,
        rating,
        comment,
    });

    const reviews = await Review.find({
        course: courseId,
    });

    const totalRatings = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
    );

    course.averageRating =
        totalRatings / reviews.length;

    course.totalReviews = reviews.length;

    await course.save();

    return review;
};

const getCourseReviewsService = async (
    courseId
) => {
    return await Review.find({
        course: courseId,
    })
        .populate(
            "student",
            "name profileImage"
        )
        .sort({
            createdAt: -1,
        });
};

const deleteReviewService = async (
    reviewId,
    studentId
) => {
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ApiError(
            404,
            "Review not found."
        );
    }

    if (
        review.student.toString() !==
        studentId.toString()
    ) {
        throw new ApiError(
            403,
            "Access denied."
        );
    }

    const courseId = review.course;

    await review.deleteOne();

    const reviews = await Review.find({
        course: courseId,
    });

    const course = await Course.findById(courseId);

    if (course) {
        if (reviews.length === 0) {
            course.averageRating = 0;
            course.totalReviews = 0;
        } else {
            const totalRatings = reviews.reduce(
                (sum, review) =>
                    sum + review.rating,
                0
            );

            course.averageRating =
                totalRatings /
                reviews.length;

            course.totalReviews =
                reviews.length;
        }

        await course.save();
    }
};

module.exports = {
    createReviewService,
    getCourseReviewsService,
    deleteReviewService,
};