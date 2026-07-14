const validateLecture = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Lecture title is required.",
        });
    }

    if (title.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Lecture title must be at least 3 characters.",
        });
    }

    if (title.trim().length > 150) {
        return res.status(400).json({
            success: false,
            message: "Lecture title cannot exceed 150 characters.",
        });
    }

    next();
};

module.exports = {
    validateLecture,
};