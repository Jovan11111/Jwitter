const express = require("express");
const {
  sendMessage,
  getMessages,
  editMessage,
  deleteMessage,
  deleteChat
} = require("../controllers/messageController");

const router = express.Router();

/**
 * Route to send a message.
 * @param {string} id1 - Sender's user ID.
 * @param {string} id2 - Receiver's user ID.
 */
router.post('/sendMessage/:id1/:id2', sendMessage);

/**
 * Route to get messages between two users.
 * @param {string} id1 - Sender's user ID.
 * @param {string} id2 - Receiver's user ID.
 */
router.get('/getMessages/:id1/:id2', getMessages);

/**
 * Route to edit a specific message.
 * @param {string} id - Message ID.
 */
router.post('/editMessage/:id', editMessage);

/**
 * Route to delete a specific message.
 * @param {string} id - Message ID.
 */
router.delete('/deleteMessage/:id', deleteMessage);

/**
 * Route to delete chat between two users.
 * @param {string} id1 - Sender's user ID.
 * @param {string} id2 - Receiver's user ID.
 */
router.delete('/deleteChat/:id1/:id2', deleteChat);

module.exports = router;
