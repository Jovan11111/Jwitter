const mongoose = require("mongoose");

/**
 * Schema for friendship requests.
 */
const friendshipRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FriendshipRequest = mongoose.model("FriendshipRequest", friendshipRequestSchema);

module.exports = FriendshipRequest;
