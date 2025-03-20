const axios = require("axios")
const Message = require("../models/Message")

const sendMessage = async (req, res) => {
    try {
        const send = req.params.id1;
        const rec = req.params.id2;
        const cont = req.body.content;

        const newMessage = new Message({
            sender: send,
            receiver: rec,
            content: cont
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};


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

        if (messages.length === 0) {
            return res.status(404).json({ message: "No messages found between these 2 users" });
        }

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};


const editMessage = async (req, res) => {
    try {
        const newContent = req.body.content; 

        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        message.content = newContent; 
        await message.save(); 

        return res.status(200).json({ message: "Message updated successfully", updatedMessage: message });

    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

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


module.exports = {
    sendMessage,
    getMessages,
    editMessage,
    deleteMessage,
    deleteChat
}