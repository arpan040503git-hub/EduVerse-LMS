const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../handlers/asyncHandler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "User not found",
        });
    }

    next();
});

module.exports = authMiddleware;