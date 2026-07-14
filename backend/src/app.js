const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const errorMiddleware = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const videoRoutes = require("./routes/videoRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const publicCourseRoutes = require("./routes/publicCourseRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

const app = express();

/*
==========================
Global Middlewares
==========================
*/

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

/*
==========================
Static Files
==========================
*/

app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);

/*
==========================
API Routes
==========================
*/

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1", sectionRoutes);
app.use("/api/v1", lectureRoutes);
app.use("/api/v1", videoRoutes);
app.use("/api/v1/enrollments", enrollmentRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/public/courses", publicCourseRoutes);
app.use("/api/v1/certificates", certificateRoutes);
/*
==========================
Health Check
==========================
*/

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "LearnHub API is running 🚀",
    });
});

/*
==========================
Global Error Handler
==========================
*/

app.use(errorMiddleware);

module.exports = app;