const asyncHandler = require("../handlers/asyncHandler");

const {
    createSectionService,
    getSectionsService,
    updateSectionService,
    deleteSectionService,
} = require("../services/sectionService");

const createSection = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { title } = req.body;

    const section = await createSectionService(
        courseId,
        req.user._id,
        title
    );

    res.status(201).json({
        success: true,
        message: "Section created successfully.",
        section,
    });
});

const getSections = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    const sections = await getSectionsService(
        courseId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        count: sections.length,
        sections,
    });
});

const updateSection = asyncHandler(async (req, res) => {
    const { sectionId } = req.params;
    const { title } = req.body;

    const section = await updateSectionService(
        sectionId,
        req.user._id,
        title
    );

    res.status(200).json({
        success: true,
        message: "Section updated successfully.",
        section,
    });
});

const deleteSection = asyncHandler(async (req, res) => {
    const { sectionId } = req.params;

    await deleteSectionService(
        sectionId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Section deleted successfully.",
    });
});

module.exports = {
    createSection,
    getSections,
    updateSection,
    deleteSection,
};