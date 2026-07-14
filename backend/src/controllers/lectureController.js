const asyncHandler = require("../handlers/asyncHandler");

const {
    createLectureService,
    getLecturesService,
    updateLectureService,
    uploadLectureVideoService,
    deleteLectureService,
} = require("../services/lectureService");

const createLecture = asyncHandler(async (req, res) => {
    const { sectionId } = req.params;

    const lecture = await createLectureService(
        sectionId,
        req.user._id,
        req.body
    );

    res.status(201).json({
        success: true,
        message: "Lecture created successfully.",
        lecture,
    });
});

const getLectures = asyncHandler(async (req, res) => {
    const { sectionId } = req.params;

    const lectures = await getLecturesService(
        sectionId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        count: lectures.length,
        lectures,
    });
});

const updateLecture = asyncHandler(async (req, res) => {
    const { lectureId } = req.params;

    const lecture = await updateLectureService(
        lectureId,
        req.user._id,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Lecture updated successfully.",
        lecture,
    });
});

const uploadLectureVideo = asyncHandler(async (req, res) => {
    const { lectureId } = req.params;

    const lecture = await uploadLectureVideoService(
        lectureId,
        req.user._id,
        req.file
    );

    res.status(200).json({
        success: true,
        message: "Video uploaded successfully.",
        lecture,
    });
});

const deleteLecture = asyncHandler(async (req, res) => {
    const { lectureId } = req.params;

    await deleteLectureService(
        lectureId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Lecture deleted successfully.",
    });
});

module.exports = {
    createLecture,
    getLectures,
    updateLecture,
    uploadLectureVideo,
    deleteLecture,
};