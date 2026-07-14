const validateUpdateCourse = (req, res, next) => {
    const { title, category, price, level, language } = req.body;

    if (title !== undefined && title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Title cannot be empty.",
        });
    }

    if (category !== undefined && category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category cannot be empty.",
        });
    }

    if (price !== undefined && (isNaN(price) || price < 0)) {
        return res.status(400).json({
            success: false,
            message: "Price must be a non-negative number.",
        });
    }

    const validLevels = ["Beginner", "Intermediate", "Advanced"];

    if (level !== undefined && !validLevels.includes(level)) {
        return res.status(400).json({
            success: false,
            message: "Level must be Beginner, Intermediate, or Advanced.",
        });
    }

    if (language !== undefined && language.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Language cannot be empty.",
        });
    }

    next();
};

module.exports = {
    validateUpdateCourse,
};