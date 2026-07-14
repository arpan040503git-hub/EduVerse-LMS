const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const Section = require("../models/Section");
const ApiError = require("../utils/ApiError");

const enrollCourseService = async (courseId, studentId) => {
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found.");
    }

    if (!course.isPublished) {
        throw new ApiError(400, "Course is not published.");
    }

    const alreadyEnrolled = await Enrollment.findOne({
        student: studentId,
        course: courseId,
    });

    if (alreadyEnrolled) {
        throw new ApiError(
            409,
            "You are already enrolled in this course."
        );
    }

    const enrollment = await Enrollment.create({
        student: studentId,
        course: courseId,
    });

    // Increment totalStudents on the course
    await Course.findByIdAndUpdate(courseId, {
        $inc: { totalStudents: 1 },
    });

    return enrollment;
};

const getMyEnrollmentsService = async (studentId) => {
    return await Enrollment.find({ student: studentId })
        .populate({
            path: "course",
            populate: {
                path: "instructor",
                select: "name email profileImage",
            },
        })
        .sort({ createdAt: -1 });
};

const getEnrollmentService = async (enrollmentId, studentId) => {
    const enrollment = await Enrollment.findById(enrollmentId).populate({
        path: "course",
        populate: {
            path: "sections",
            populate: {
                path: "lectures",
                select: "title description isPreview order video",
            },
        },
    });

    if (!enrollment) {
        throw new ApiError(404, "Enrollment not found.");
    }

    if (enrollment.student.toString() !== studentId.toString()) {
        throw new ApiError(403, "Access denied.");
    }

    return enrollment;
};

const updateProgressService = async (
    enrollmentId,
    studentId,
    lectureId
) => {
    const enrollment = await Enrollment.findById(enrollmentId);

    if (!enrollment) {
        throw new ApiError(404, "Enrollment not found.");
    }

    if (enrollment.student.toString() !== studentId.toString()) {
        throw new ApiError(403, "Access denied.");
    }

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        throw new ApiError(404, "Lecture not found.");
    }

    // Idempotent — skip if already completed
    const alreadyCompleted = enrollment.completedLectures.some(
        (id) => id.toString() === lectureId.toString()
    );

    if (alreadyCompleted) {
        return enrollment;
    }

    enrollment.completedLectures.push(lectureId);

    // Fix: fetch the course with its sections to get accurate section IDs
    const course = await Course.findById(enrollment.course);

    const totalLectures = await Lecture.countDocuments({
        section: { $in: course.sections },
    });

    if (totalLectures === 0) {
        throw new ApiError(400, "This course has no lectures.");
    }

    enrollment.progress = Math.round(
        (enrollment.completedLectures.length / totalLectures) * 100
    );

    if (enrollment.progress >= 100) {
        enrollment.completed = true;
        enrollment.certificateIssued = true;
    }

    await enrollment.save();

    return enrollment;
};

module.exports = {
    enrollCourseService,
    getMyEnrollmentsService,
    getEnrollmentService,
    updateProgressService,
};