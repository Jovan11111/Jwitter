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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

// Export the Post model
module.exports = Post;
