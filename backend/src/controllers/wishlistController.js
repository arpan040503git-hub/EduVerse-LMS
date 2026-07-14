const asyncHandler = require("../handlers/asyncHandler");

const {
    getWishlistService,
    addToWishlistService,
    removeFromWishlistService,
} = require("../services/wishlistService");

const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await getWishlistService(req.user._id);

    res.status(200).json({
        success: true,
        wishlist,
    });
});

const addToWishlist = asyncHandler(async (req, res) => {
    const wishlist = await addToWishlistService(
        req.params.courseId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Course added to wishlist.",
        wishlist,
    });
});

const removeFromWishlist = asyncHandler(async (req, res) => {
    const wishlist = await removeFromWishlistService(
        req.params.courseId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Course removed from wishlist.",
        wishlist,
    });
});

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
};