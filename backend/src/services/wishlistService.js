const Wishlist = require("../models/Wishlist");
const Course = require("../models/Course");
const ApiError = require("../utils/ApiError");

const getWishlistService = async (studentId) => {
    let wishlist = await Wishlist.findOne({
        student: studentId,
    }).populate({
        path: "courses",
        populate: {
            path: "instructor",
            select: "name profileImage",
        },
    });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            student: studentId,
            courses: [],
        });

        wishlist = await Wishlist.findById(
            wishlist._id
        ).populate({
            path: "courses",
            populate: {
                path: "instructor",
                select: "name profileImage",
            },
        });
    }

    return wishlist;
};

const addToWishlistService = async (
    courseId,
    studentId
) => {
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found.");
    }

    let wishlist = await Wishlist.findOne({
        student: studentId,
    });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            student: studentId,
            courses: [],
        });
    }

    const exists = wishlist.courses.some(
        (id) => id.toString() === courseId.toString()
    );

    if (exists) {
        throw new ApiError(
            409,
            "Course already exists in wishlist."
        );
    }

    wishlist.courses.push(courseId);

    await wishlist.save();

    return await Wishlist.findById(
        wishlist._id
    ).populate({
        path: "courses",
        populate: {
            path: "instructor",
            select: "name profileImage",
        },
    });
};

const removeFromWishlistService = async (
    courseId,
    studentId
) => {
    const wishlist = await Wishlist.findOne({
        student: studentId,
    });

    if (!wishlist) {
        throw new ApiError(
            404,
            "Wishlist not found."
        );
    }

    wishlist.courses.pull(courseId);

    await wishlist.save();

    return await Wishlist.findById(
        wishlist._id
    ).populate({
        path: "courses",
        populate: {
            path: "instructor",
            select: "name profileImage",
        },
    });
};

module.exports = {
    getWishlistService,
    addToWishlistService,
    removeFromWishlistService,
};