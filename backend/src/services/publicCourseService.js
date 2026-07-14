const Course = require("../models/Course");

const getPublishedCoursesService = async () => {
    return await Course.find({
        isPublished: true,
    })
        .populate(
            "instructor",
            "name profileImage"
        )
        .sort({
            createdAt: -1,
        });
};

const getSinglePublishedCourseService = async (
    courseId
) => {
    return await Course.findOne({
        _id: courseId,
        isPublished: true,
    })
        .populate(
            "instructor",
            "name profileImage bio"
        )
        .populate({
            path: "sections",
            populate: {
                path: "lectures",
                select:
                    "title description isPreview duration order",
            },
        });
};

const searchCoursesService = async (query) => {
    return await Course.find({
        isPublished: true,
        $or: [
            {
                title: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                category: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                subtitle: {
                    $regex: query,
                    $options: "i",
                },
            },
        ],
    })
        .populate(
            "instructor",
            "name profileImage"
        )
        .sort({
            createdAt: -1,
        });
};

const filterCoursesService = async ({
    category,
    level,
    price,
}) => {
    const filter = {
        isPublished: true,
    };

    if (category) {
        filter.category = category;
    }

    if (level) {
        filter.level = level;
    }

    if (price === "free") {
        filter.price = 0;
    }

    if (price === "paid") {
        filter.price = {
            $gt: 0,
        };
    }

    return await Course.find(filter)
        .populate(
            "instructor",
            "name profileImage"
        )
        .sort({
            createdAt: -1,
        });
};

module.exports = {
    getPublishedCoursesService,
    getSinglePublishedCourseService,
    searchCoursesService,
    filterCoursesService,
};