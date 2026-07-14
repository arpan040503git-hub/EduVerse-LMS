const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        completedLectures: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecture",
            },
        ],

        completed: {
            type: Boolean,
            default: false,
        },

        certificateIssued: {
            type: Boolean,
            default: false,
        },

        enrolledAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate enrollment
enrollmentSchema.index(
    {
        student: 1,
        course: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    "Enrollment",
    enrollmentSchema
);