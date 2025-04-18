const axios = require("axios");
const Message = require("../models/Message");

/**
 * Send a new message from one user to another.
 * 
 * @param {Object} req - The request object, containing the sender, receiver, and message content.
 * @param {Object} res - The response object used to send back the result.
 * @returns {Object} JSON response with the newly created message.
 */
const sendMessage = async (req, res) => {
    try {
        const sender = req.params.id1;
        const receiver = req.params.id2;
        const content = req.body.content;

        const newMessage = new Message({
            sender,
            receiver,
            content
        });

        const senderUserResp = await axios.get(`http://auth-service:5000/api/auth/user/${sender}`);
        const receiverUserResp = await axios.get(`http://auth-service:5000/api/auth/user/${receiver}`);
        const senderUser = senderUserResp.data;
        const receiverUser = receiverUserResp.data;
        
        if(receiverUser.messageNotifs){
            await axios.post('http://email-service:5005/api/email/msg', {to: receiverUser.email, sender: senderUser.username, content: content});
        }

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

/**
 * Get all messages exchanged between two users.
 * 
 * @param {Object} req - The request object containing sender and receiver IDs.
 * @param {Object} res - The response object used to send back the result.
 * @returns {Object} JSON response with the list of messages between the two users.
 */
const getMessages = async (req, res) => {
    try {
        const sender = req.params.id1;
        const receiver = req.params.id2;

        const messages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        });

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

/**
 * Edit the content of an existing message.
 * 
 * @param {Object} req - The request object containing the message ID and new content.
 * @param {Object} res - The response object used to send back the result.
 * @returns {Object} JSON response with the updated message.
 */
const editMessage = async (req, res) => {
    try {
        const newContent = req.body.content;

        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        message.content = newContent;
        await message.save();

        return res.status(200).json({
            message: "Message updated successfully",
            updatedMessage: message
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

/**
 * Delete a message by its ID.
 * 
 * @param {Object} req - The request object containing the message ID to be deleted.
 * @param {Object} res - The response object used to send back the result.
 * @returns {Object} JSON response indicating whether the deletion was successful.
 */
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        await message.deleteOne();
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

/**
 * Delete all messages between two users.
 * 
 * @param {Object} req - The request object containing sender and receiver IDs.
 * @param {Object} res - The response object used to send back the result.
 * @returns {Object} JSON response indicating whether the chat was deleted successfully.
 */
const deleteChat = async (req, res) => {
    try {
        const sender = req.params.id1;
        const receiver = req.params.id2;

        const result = await Message.deleteMany({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No messages found" });
        }

        return res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

/**
 * 
 */
const getUserChats = async (req, res) => {
    try {
        const user = req.params.id;
        
        const allUserMessages = await Message.find({
            $or: [ {sender: user}, {receiver: user} ]
        });

        const chatterIds = [...new Set(allUserMessages.map(message => 
            message.sender.toString() === user ? message.receiver.toString() : message.sender.toString()
        ))];

        const chatters = await Promise.all(chatterIds.map(async (cid) => {
            try{
                const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${cid}`);
                return userResp.data;
            } catch{
                return {username: 'unknown', email: 'unknown', _id: 'unknown'};
            }
        }));

        return res.status(200).json(chatters);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

/**
 * 
 */
const deleteUserMessages = async (req, res) => {
    try{
        const user = req.params.id;
        await Message.deleteMany({$or: [{sender: user}, {receiver: user}]});

        console.log("deleted messages");
        
        return res.status(200).json({message: "Successfully deleted user messages"});
    } catch (error){
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

module.exports = {
    sendMessage,
    getMessages,
    editMessage,
    deleteMessage,
    deleteChat,
    getUserChats,
    deleteUserMessages
};
