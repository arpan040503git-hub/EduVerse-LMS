const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        subtitle: {
            type: String,
            trim: true,
            default: "",
        },

        description: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            required: true,
        },

        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },

        language: {
            type: String,
            default: "English",
        },

        price: {
            type: Number,
            default: 0,
        },

        thumbnail: {
            type: String,
            default: "",
        },

        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        sections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Section",
            },
        ],

        averageRating: {
            type: Number,
            default: 0,
        },

        totalReviews: {
            type: Number,
            default: 0,
        },

        totalStudents: {
            type: Number,
            default: 0,
        },

        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Course", courseSchema);