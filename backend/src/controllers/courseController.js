const asyncHandler = require("../handlers/asyncHandler");

const {
    createCourseService,
    getInstructorCoursesService,
    getSingleCourseService,
    updateCourseService,
    updateThumbnailService,
    publishCourseService,
    unpublishCourseService,
    deleteCourseService,
} = require("../services/courseService");

const createCourse = asyncHandler(async (req, res) => {
    const { title, category } = req.body;

    const course = await createCourseService({
        title,
        category,
        instructor: req.user._id,
    });

    res.status(201).json({
        success: true,
        message: "Course created successfully.",
        course,
    });
});

const getInstructorCourses = asyncHandler(async (req, res) => {
    const courses = await getInstructorCoursesService(req.user._id);

    res.status(200).json({
        success: true,
        count: courses.length,
        courses,
    });
});

const getSingleCourse = asyncHandler(async (req, res) => {
    const course = await getSingleCourseService(
        req.params.courseId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        course,
    });
});

const updateCourse = asyncHandler(async (req, res) => {
    const course = await updateCourseService(
        req.params.courseId,
        req.user._id,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Course updated successfully.",
        course,
    });
});

const updateThumbnail = asyncHandler(async (req, res) => {
    const course = await updateThumbnailService(
        req.params.courseId,
        req.user._id,
        req.file
    );

    res.status(200).json({
        success: true,
        message: "Thumbnail uploaded successfully.",
        course,
    });
});

const publishCourse = asyncHandler(async (req, res) => {
    const course = await publishCourseService(
        req.params.courseId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Course published successfully.",
        course,
    });
});

const unpublishCourse = asyncHandler(async (req, res) => {
    const course = await unpublishCourseService(
        req.params.courseId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Course unpublished successfully.",
        course,
    });
});

const deleteCourse = asyncHandler(async (req, res) => {
    await deleteCourseService(req.params.courseId, req.user._id);

    res.status(200).json({
        success: true,
        message: "Course deleted successfully.",
    });
});

module.exports = {
    createCourse,
    getInstructorCourses,
    getSingleCourse,
    updateCourse,
    updateThumbnail,
    publishCourse,
    unpublishCourse,
    deleteCourse,
};