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
    resetToken: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
