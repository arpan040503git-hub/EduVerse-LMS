const { z } = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters.")
        .max(50, "Name cannot exceed 50 characters."),

    email: z
        .string()
        .trim()
        .email("Invalid email address."),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),

    role: z
        .enum(["student", "instructor", "admin"])
        .default("student"),

    bio: z
        .string()
        .max(300, "Bio cannot exceed 300 characters.")
        .optional(),
});

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address."),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),
});

module.exports = {
    registerSchema,
    loginSchema,
};