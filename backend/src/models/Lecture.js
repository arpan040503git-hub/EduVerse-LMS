const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        video: {
            url: {
                type: String,
                default: "",
            },

            publicId: {
                type: String,
                default: "",
            },

            duration: {
                type: Number,
                default: 0,
            },

            size: {
                type: Number,
                default: 0,
            },
        },

        isPreview: {
            type: Boolean,
            default: false,
        },

        order: {
            type: Number,
            default: 1,
        },

        isPublished: {
            type: Boolean,
            default: false,
        },

        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Lecture", lectureSchema);