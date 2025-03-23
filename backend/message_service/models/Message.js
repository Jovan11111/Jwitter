const mongoose = require("mongoose");

/**
 * Schema for the Message model.
 * Defines structure for a message.
 */
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
