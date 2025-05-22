const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const crypto = require("crypto");
const mongoose = require("mongoose")

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
        
        return res.status(201).json({message: "Registered succesfully"});
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

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

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

        console.log(user);
        
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

const deleteProfileNoPass  = async (req, res) => {
    try {
        const { userr } = req.body;
        
        const user = await User.findById(userr);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
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

const changePassword = async(req, res) => {
    try {
        const {userId, newPass} = req.body;
        const hashedPassword = await bcrypt.hash(newPass, 10);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({message: "Changed password succesfully"});
    } catch(error){
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * 
 */
const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
    
        const token = crypto.randomBytes(32).toString("hex");
        
        await user.updateOne({resetToken: token});
        
        const updatedUser = await User.findOne({ email });

        await axios.post("http://email-service:5005/api/email/reset", {to:email, token:updatedUser.resetToken});

        return res.status(200).json({ message: "Reset email sent" });
    }catch(error){
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * 
 */
const resetPassword = async (req, res) => {
    try{
        const token = req.params.token;
        const { newPassword } = req.body;
        
        const user = await User.findOne({
            resetToken: token,
        });
    
        if (!user) return res.status(400).json({ message: "Invalid or expired token" });
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.updateOne({
            password: hashedPassword,
            resetToken: ""
        });
        return res.status(200).json({ message: "Password successfully reset" });
    } catch(error){
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * 
 */
const saveNotificationSettings = async (req, res) => {
    try{
        const userId = req.params.id
        const {frreq, msg} = req.body
        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        if (typeof frreq !== "boolean" || typeof msg !== "boolean") {
            return res.status(400).json({ error: "Invalid notification settings" });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.frReqNotifs = frreq;
        user.messageNotifs = msg;

        await user.save();

        return res.status(200).json({message: "Updated notification settings"}); 
    } catch(error){
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

const saveVisibilitySettings = async (req, res) => {
    try{
        const userId = req.params.id;
        const {post, like, friend, email} = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const allowedValues = ["everyone", "friends", "nobody"];

        if (
            !allowedValues.includes(post) ||
            !allowedValues.includes(like) ||
            !allowedValues.includes(friend) ||
            !allowedValues.includes(email)
        ) {
            return res.status(400).json({ error: "Invalid visibility settings" });
        }


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.postVisibility = post
        user.likeVisibility = like
        user.friendVisibility = friend
        user.emailVisibility = email

        await user.save();
        return res.status(200).json({message: "Updated visibility settings"});
    } catch (error){
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

const reportUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const {scoree} = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        
        if(typeof scoree !== "number" || scoree < 0){
            return res.status(400).json({error: "Invalid score"})
        } 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.reportScore = user.reportScore + scoree;
        await user.save();
        
        return res.status(200).json({message: "Reported user"});
    } catch(error){
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

/**
 * 
 */
const searchUsers = async (req, res) => {
    try {
        const query = req.params.query;
        const safeQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const users = await User.find({username: {$regex: safeQuery, $options: "i"}})

        return res.status(200).json(users)
    } catch(error){
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

/**
 * 
 */
const acceptAppeal = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.reportScore = user.reportScore - 50;
        await user.save();

        return res.status(200).json({message: "User cleared of the blocked post"});
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

/**
 * 
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users)
    } catch (error){
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

/**
 * 
 */
const switchUserRole = async (req, res) => {
    try {
        const {userId, userRole} = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const allowedValues = ["admin", "user"];

        if (
            !allowedValues.includes(userRole)
        ) {
            return res.status(400).json({ error: "Invalid user role" });
        }


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.role = userRole;

        await user.save();

        return res.status(200).json({message: "Switched user role"});
    } catch(error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    saveNotificationSettings,
    saveVisibilitySettings,
    reportUser,
    deleteProfileNoPass,
    searchUsers,
    acceptAppeal,
    getAllUsers,
    switchUserRole
};
