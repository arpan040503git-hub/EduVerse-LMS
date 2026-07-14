const { registerSchema, loginSchema } = require("../validators/authValidator");
const { registerUser, loginUser } = require("../services/authService");
const asyncHandler = require("../handlers/asyncHandler");

const register = asyncHandler(async (req, res) => {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
    });
});

const login = asyncHandler(async (req, res) => {
    const validatedData = loginSchema.parse(req.body);

    const { user, token } = await loginUser(validatedData);

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    // res.status(200).json({
    //     success: true,
    //     message: "Login successful",
    //     user,
    // });
    res.status(200).json({
        success: true,
        message: "Login successful",
        token,   // add this line
        user,
    });
});

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

module.exports = {
    register,
    login,
    getMe,
};