const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

/**
 * Registers a new user.
 * @param {Object} req - Express request object containing username, password, and email.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with the created user or an error message.
 */
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Logs in a user and generates a JWT token.
 * @param {Object} req - Express request object containing username and password.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with a token or an error message.
 */
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Retrieves user information by ID.
 * @param {Object} req - Express request object containing the user ID as a parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with user data or an error message.
 */
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const { userr, passwordd } = req.body;
        
        const user = await User.findById(userr);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(passwordd, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        await axios.delete(`http://comment-service:5004/api/comment/deleteUserComments/${userr}`);
        await axios.delete(`http://friendship-service:5002/api/friend/deleteUserFrReqsAndFrShips/${userr}`);
        await axios.delete(`http://message-service:5003/api/message/deleteUserMessages/${userr}`);
        await axios.delete(`http://post-service:5001/api/post/deleteUserPosts/${userr}`);
        await User.findByIdAndDelete(userr);

        return res.status(200).json({ message: "Deleted user successfully" });

    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteProfile
};
