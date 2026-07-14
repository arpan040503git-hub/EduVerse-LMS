const express = require("express");

const {
    createLecture,
    getLectures,
    updateLecture,
    uploadLectureVideo,
    deleteLecture,
} = require("../controllers/lectureController");

const authMiddleware = require("../middlewares/authMiddleware");

const {
    isInstructorOrAdmin,
} = require("../middlewares/roleMiddleware");

const {
    validateLecture,
} = require("../validators/lectureValidator");

const uploadVideo = require("../middlewares/videoUploadMiddleware");

const router = express.Router();

/*
====================================
Lecture Routes
====================================
*/

router.post(
    "/sections/:sectionId/lectures",
    authMiddleware,
    isInstructorOrAdmin,
    validateLecture,
    createLecture
);

router.get(
    "/sections/:sectionId/lectures",
    authMiddleware,
    isInstructorOrAdmin,
    getLectures
);

router.patch(
    "/lectures/:lectureId",
    authMiddleware,
    isInstructorOrAdmin,
    updateLecture
);

router.patch(
    "/lectures/:lectureId/video",
    authMiddleware,
    isInstructorOrAdmin,
    uploadVideo.single("video"),
    uploadLectureVideo
);

router.delete(
    "/lectures/:lectureId",
    authMiddleware,
    isInstructorOrAdmin,
    deleteLecture
);

module.exports = router;