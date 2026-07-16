const Course = require("../models/Course");
const Section = require("../models/Section");
const Lecture = require("../models/Lecture");
const Enrollment = require("../models/Enrollment");
const Review = require("../models/Review");
const Wishlist = require("../models/Wishlist");
const fs = require("fs");
const path = require("path");
const ApiError = require("../utils/ApiError");

const findOwnedCourse = async (courseId, userId) => {
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found.");
    }

    if (course.instructor.toString() !== userId.toString()) {
        throw new ApiError(403,"You are not authorized to access this course.");
    }
    return course;
};

const createCourseService = async (courseData) => {
    return await Course.create(courseData);
};

const getInstructorCoursesService = async (userId) => {
    return await Course.find({ instructor: userId })
        .select(
            "title subtitle thumbnail category level isPublished averageRating totalStudents totalReviews createdAt"
        )
        .sort({ createdAt: -1 });
};

const getSingleCourseService = async (courseId, userId) => {
    const course = await findOwnedCourse(courseId, userId);

    return await Course.findById(course._id).populate({
        path: "sections",
        populate: {
            path: "lectures",
            select: "title description isPreview order isPublished video",
        },
    });
};

const updateCourseService = async (courseId, userId, updateData) => {
    const course = await findOwnedCourse(courseId, userId);

    const allowedFields = [
        "title",
        "subtitle",
        "description",
        "category",
        "level",
        "language",
        "price",
    ];

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            course[field] = updateData[field];
        }
    });

    await course.save();

    return course;
};

const updateThumbnailService = async (courseId, userId, file) => {
    if (!file) {
        throw new ApiError(400, "Thumbnail is required.");
    }

    const course = await findOwnedCourse(courseId, userId);

    // Delete old thumbnail if it exists
    if (course.thumbnail) {
        const oldPath = path.join(__dirname, "../../", course.thumbnail);
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }
    }

    course.thumbnail = "/uploads/thumbnails/" + file.filename;

    await course.save();

    return course;
};

const publishCourseService = async (courseId, userId) => {
    const course = await findOwnedCourse(courseId, userId);

    if (!course.description) {
        throw new ApiError(400, "Course description is required.");
    }

    // if (!course.thumbnail) {
    //     throw new ApiError(400, "Course thumbnail is required.");
    // }

    const sectionCount = await Section.countDocuments({
        course: course._id,
    });

    if (sectionCount === 0) {
        throw new ApiError(400, "At least one section is required.");
    }

    const lectureCount = await Lecture.countDocuments({
        section: { $in: course.sections },
    });

    if (lectureCount === 0) {
        throw new ApiError(400, "At least one lecture is required.");
    }

    course.isPublished = true;

    await course.save();

    return course;
};

const unpublishCourseService = async (courseId, userId) => {
    const course = await findOwnedCourse(courseId, userId);

    course.isPublished = false;

    await course.save();

    return course;
};

const deleteCourseService = async (courseId, userId) => {
    const course = await findOwnedCourse(courseId, userId);

    // Delete all sections and their lectures + video files
    const sections = await Section.find({ course: course._id });

    for (const section of sections) {
        const lectures = await Lecture.find({ section: section._id });

        for (const lecture of lectures) {
            if (lecture.video && lecture.video.url) {
                const videoPath = path.join(
                    __dirname,
                    "../../",
                    lecture.video.url
                );

                if (fs.existsSync(videoPath)) {
                    fs.unlinkSync(videoPath);
                }
            }

            await lecture.deleteOne();
        }

        await section.deleteOne();
    }

    // Delete thumbnail
    if (course.thumbnail) {
        const thumbnailPath = path.join(
            __dirname,
            "../../",
            course.thumbnail
        );

        if (fs.existsSync(thumbnailPath)) {
            fs.unlinkSync(thumbnailPath);
        }
    }

    // Delete enrollments, reviews, wishlist references
    await Enrollment.deleteMany({ course: course._id });
    await Review.deleteMany({ course: course._id });
    await Wishlist.updateMany(
        { courses: course._id },
        { $pull: { courses: course._id } }
    );

    await course.deleteOne();
};

module.exports = {
    findOwnedCourse,
    createCourseService,
    getInstructorCoursesService,
    getSingleCourseService,
    updateCourseService,
    updateThumbnailService,
    publishCourseService,
    unpublishCourseService,
    deleteCourseService,
};