const asyncHandler = require("../handlers/asyncHandler");

const {
    enrollCourseService,
    getMyEnrollmentsService,
    getEnrollmentService,
    updateProgressService,
} = require("../services/enrollmentService");

const enrollCourse = asyncHandler(async (req, res) => {
    const enrollment = await enrollCourseService(
        req.params.courseId,
        req.user._id
    );

    res.status(201).json({
        success: true,
        message: "Course enrolled successfully.",
        enrollment,
    });
});

const getMyEnrollments = asyncHandler(async (req, res) => {
    const enrollments = await getMyEnrollmentsService(
        req.user._id
    );

    res.status(200).json({
        success: true,
        count: enrollments.length,
        enrollments,
    });
});

const getEnrollment = asyncHandler(async (req, res) => {
    const enrollment = await getEnrollmentService(
        req.params.enrollmentId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        enrollment,
    });
});

const updateProgress = asyncHandler(async (req, res) => {
    const { lectureId } = req.body;

    const enrollment = await updateProgressService(
        req.params.enrollmentId,
        req.user._id,
        lectureId
    );

    res.status(200).json({
        success: true,
        message: "Progress updated successfully.",
        enrollment,
    });
});

module.exports = {
    enrollCourse,
    getMyEnrollments,
    getEnrollment,
    updateProgress,
};