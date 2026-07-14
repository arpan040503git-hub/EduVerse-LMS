const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        order: {
            type: Number,
            default: 1,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        lectures: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecture",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Section", sectionSchema);