const Course = require("../models/Course");
const Section = require("../models/Section");
const Lecture = require("../models/Lecture");
const { findOwnedCourse } = require("./courseService");
const ApiError = require("../utils/ApiError");
const fs = require("fs");
const path = require("path");

const findOwnedSection = async (sectionId, userId) => {
    const section = await Section.findById(sectionId);

    if (!section) {
        throw new ApiError(404, "Section not found.");
    }

    await findOwnedCourse(section.course, userId);

    return section;
};

const createSectionService = async (courseId, userId, title) => {
    const course = await findOwnedCourse(courseId, userId);

    const section = await Section.create({
        title,
        order: course.sections.length + 1,
        course: course._id,
    });

    course.sections.push(section._id);

    await course.save();

    return section;
};

const getSectionsService = async (courseId, userId) => {
    await findOwnedCourse(courseId, userId);

    return await Section.find({ course: courseId })
        .populate({
            path: "lectures",
            select: "title isPreview order isPublished video",
        })
        .sort({ order: 1 });
};

const updateSectionService = async (sectionId, userId, title) => {
    const section = await findOwnedSection(sectionId, userId);

    section.title = title;

    await section.save();

    return section;
};

const deleteSectionService = async (sectionId, userId) => {
    const section = await findOwnedSection(sectionId, userId);

    // Cascade delete all lectures and their video files
    const lectures = await Lecture.find({ section: section._id });

    for (const lecture of lectures) {
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

        await lecture.deleteOne();
    }

    // Pull section reference from the course
    await Course.findByIdAndUpdate(section.course, {
        $pull: { sections: section._id },
    });

    await section.deleteOne();
};

module.exports = {
    findOwnedSection,
    createSectionService,
    getSectionsService,
    updateSectionService,
    deleteSectionService,
};