const fs = require("fs");
const path = require("path");
const asyncHandler = require("../handlers/asyncHandler");
const Lecture = require("../models/Lecture");
const Section = require("../models/Section");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const ApiError = require("../utils/ApiError");

const streamLectureVideo = asyncHandler(async (req, res) => {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        throw new ApiError(404, "Lecture not found.");
    }

    if (!lecture.video || !lecture.video.url) {
        throw new ApiError(404, "Video not found.");
    }

    // Resolve the course via section so we can check ownership / enrollment
    const section = await Section.findById(lecture.section);

    if (!section) {
        throw new ApiError(404, "Section not found.");
    }

    const course = await Course.findById(section.course);

    if (!course) {
        throw new ApiError(404, "Course not found.");
    }

    const userId = req.user._id.toString();
    const isInstructor = course.instructor.toString() === userId;
    const isAdmin = req.user.role === "admin";

    // Preview lectures are accessible to everyone who is authenticated
    const isPreview = lecture.isPreview;

    if (!isInstructor && !isAdmin && !isPreview) {
        // Must be enrolled
        const enrollment = await Enrollment.findOne({
            student: req.user._id,
            course: course._id,
        });

        if (!enrollment) {
            throw new ApiError(
                403,
                "You must be enrolled in this course to watch this lecture."
            );
        }
    }

    const videoPath = path.join(__dirname, "../../", lecture.video.url);

    if (!fs.existsSync(videoPath)) {
        throw new ApiError(404, "Video file not found on disk.");
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
        res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        });

        fs.createReadStream(videoPath).pipe(res);
        return;
    }

    const CHUNK_SIZE = 10 ** 6; // 1MB chunks

    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;

    res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    });

    fs.createReadStream(videoPath, { start, end }).pipe(res);
});

module.exports = {
    streamLectureVideo,
};