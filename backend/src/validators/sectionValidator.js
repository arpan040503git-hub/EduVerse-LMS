const validateSection = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Section title is required.",
        });
    }

    if (title.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Section title must be at least 3 characters.",
        });
    }

    if (title.trim().length > 100) {
        return res.status(400).json({
            success: false,
            message: "Section title cannot exceed 100 characters.",
        });
    }

    next();
};

module.exports = {
    validateSection,
};