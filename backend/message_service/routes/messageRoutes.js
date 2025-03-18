const express = require("express")

const {sendMessage, getMessages, editMessage,deleteMessage, deleteChat} = require("../controllers/messageController")

const router = express.Router();

router.post('/sendMessage/:id1/:id2', sendMessage);
router.get('/getMessages/:id1/:id2', getMessages);
router.post('/editMessage/:id', editMessage);
router.delete('/deleteMessage/:id', deleteMessage);
router.delete('/deleteChat/:id1/:id2', deleteChat)

module.exports = router