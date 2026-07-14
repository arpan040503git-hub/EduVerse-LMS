const asyncHandler = require("../handlers/asyncHandler");

const {
    getPublishedCoursesService,
    getSinglePublishedCourseService,
    searchCoursesService,
    filterCoursesService,
} = require("../services/publicCourseService");

const getPublishedCourses = asyncHandler(
    async (req, res) => {
        const courses =
            await getPublishedCoursesService();

        res.status(200).json({
            success: true,
            count: courses.length,
            courses,
        });
    }
);

const getSinglePublishedCourse =
    asyncHandler(async (req, res) => {
        const course =
            await getSinglePublishedCourseService(
                req.params.courseId
            );

        res.status(200).json({
            success: true,
            course,
        });
    });

const searchCourses = asyncHandler(
    async (req, res) => {
        const courses =
            await searchCoursesService(
                req.query.q || ""
            );

        res.status(200).json({
            success: true,
            count: courses.length,
            courses,
        });
    }
);

const filterCourses = asyncHandler(
    async (req, res) => {
        const courses =
            await filterCoursesService(req.query);

        res.status(200).json({
            success: true,
            count: courses.length,
            courses,
        });
    }
);

module.exports = {
    getPublishedCourses,
    getSinglePublishedCourse,
    searchCourses,
    filterCourses,
};