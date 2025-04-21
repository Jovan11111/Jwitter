const mongoose = require('mongoose');

// Define the post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    numLikes: {
        type: Number,
        default: 0
    },
    numDislikes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reportScore: {
        type: Number,
        default: 0
    },
    reportStatus: {
        type: String,
        enum: ["clear", "deleted", "appealed"],
        default: "clear"
    }
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

// Export the Post model
module.exports = Post;
