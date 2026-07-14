const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
    // Zod Validation Error
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: err.errors.map((error) => ({
                field: error.path.join("."),
                message: error.message,
            })),
        });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined,
    });
};

module.exports = errorMiddleware;