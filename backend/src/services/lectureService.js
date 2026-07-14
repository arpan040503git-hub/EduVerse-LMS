const Lecture = require("../models/Lecture");
const Section = require("../models/Section");
const { findOwnedSection } = require("./sectionService");
const ApiError = require("../utils/ApiError");
const fs = require("fs");
const path = require("path");

const createLectureService = async (sectionId, userId, lectureData) => {
    const section = await findOwnedSection(sectionId, userId);

    const lecture = await Lecture.create({
        title: lectureData.title,
        description: lectureData.description || "",
        order: section.lectures.length + 1,
        section: section._id,
    });

    section.lectures.push(lecture._id);

    await section.save();

    return lecture;
};

const getLecturesService = async (sectionId, userId) => {
    await findOwnedSection(sectionId, userId);

    return await Lecture.find({ section: sectionId }).sort({ order: 1 });
};

const updateLectureService = async (lectureId, userId, lectureData) => {
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        throw new ApiError(404, "Lecture not found.");
    }

    await findOwnedSection(lecture.section, userId);

    const allowedFields = [
        "title",
        "description",
        "isPreview",
        "order",
        "isPublished",
    ];

    allowedFields.forEach((field) => {
        if (lectureData[field] !== undefined) {
            lecture[field] = lectureData[field];
        }
    });

    await lecture.save();

    return lecture;
};

const uploadLectureVideoService = async (lectureId, userId, file) => {
    if (!file) {
        throw new ApiError(400, "Video file is required.");
    }

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        throw new ApiError(404, "Lecture not found.");
    }

    await findOwnedSection(lecture.section, userId);

    // Delete old video file from disk if it exists
    if (lecture.video && lecture.video.url) {
        const oldVideoPath = path.join(
            __dirname,
            "../../",
            lecture.video.url
        );

        if (fs.existsSync(oldVideoPath)) {
            fs.unlinkSync(oldVideoPath);
        }
    }

    lecture.video = {
        url: `/uploads/videos/${file.filename}`,
        publicId: "",
        duration: 0,
        size: file.size,
    };

    await lecture.save();

    return lecture;
};

const deleteLectureService = async (lectureId, userId) => {
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        throw new ApiError(404, "Lecture not found.");
    }

    const section = await findOwnedSection(lecture.section, userId);

    // Delete video file from disk
    if (lecture.video && lecture.video.url) {
        const videoPath = path.join(
            __dirname,
            "../../",
            lecture.video.url
        );

        if (fs.existsSync(videoPath)) {
            fs.unlinkSync(videoPath);
        }
    }

    // Remove lecture reference from the section
    section.lectures.pull(lecture._id);

    await section.save();

    await lecture.deleteOne();
};

module.exports = {
    createLectureService,
    getLecturesService,
    updateLectureService,
    uploadLectureVideoService,
    deleteLectureService,
};