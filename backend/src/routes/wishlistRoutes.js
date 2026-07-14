const express = require("express");

const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} = require("../controllers/wishlistController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    getWishlist
);

router.post(
    "/:courseId",
    authMiddleware,
    addToWishlist
);

router.delete(
    "/:courseId",
    authMiddleware,
    removeFromWishlist
);

module.exports = router;