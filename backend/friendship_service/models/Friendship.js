const mongoose = require("mongoose");

/**
 * Schema for friendships between users.
 */
const friendshipSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Friendship = mongoose.model("Friendship", friendshipSchema);

module.exports = Friendship;
