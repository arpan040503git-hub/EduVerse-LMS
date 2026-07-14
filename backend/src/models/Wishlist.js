const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
    },
    {
        timestamps: true,
    }
);

wishlistSchema.index(
    {
        student: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    "Wishlist",
    wishlistSchema
);