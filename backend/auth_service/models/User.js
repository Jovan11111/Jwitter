const mongoose = require("mongoose");

/**
 * Mongoose schema for User.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    frReqNotifs: {
        type: Boolean,
        default: true
    },
    messageNotifs: {
        type: Boolean,
        default: true
    },
    resetToken: {
        type: String
    },
    postVisibility: {
        type: String,
        enum: ["everyone", "friends", "nobody"],
        default: "everyone"
    },
    likeVisibility: {
        type: String,
        enum: ["everyone", "friends", "nobody"],
        default: "everyone"
    },
    friendVisibility: {
        type: String,
        enum: ["everyone", "friends", "nobody"],
        default: "everyone"
    },
    emailVisibility: {
        type: String,
        enum: ["everyone", "friends", "nobody"],
        default: "everyone"
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
