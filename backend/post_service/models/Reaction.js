const mongoose = require("mongoose");

// Define a reaction schema for remembering who liked and disliked the post
const reactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reaction: {
        type: String,
        enum: ["liked", "disliked"],
        required: true
    }
});

// Create a model
const Reaction = mongoose.model('Reaction', reactionSchema);

// Export the model
module.exports = Reaction