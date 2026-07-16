const express = require("express");

const {streamLectureVideo} = require("../controllers/videoController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/lectures/:lectureId/video",
    authMiddleware,
    streamLectureVideo
);

module.exports = router;