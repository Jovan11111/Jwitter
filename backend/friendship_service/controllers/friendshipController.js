/**
 * Friendship Controller
 * 
 * This module handles friendship-related operations, including sending, accepting,
 * and declining friend requests, checking friendship status, and retrieving user friends.
 */

const axios = require('axios');
const FriendshipRequest = require('../models/FriendshipRequest');
const Friendship = require('../models/Friendship');

/**
 * Sends a friend request from one user to another.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const sendFrReq = async (req, res) => {
    try {
        const sender = req.params.sender;
        const receiver = req.params.receiver;

        // Check if a friend request or friendship already exists
        const frreqExists = await FriendshipRequest.findOne({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        });

        if (frreqExists) {
            return res.status(400).json({ message: 'Friendship already exists' });
        }

        // Create and save a new friend request
        const newFrReq = new FriendshipRequest({ sender, receiver });
        await newFrReq.save();

        res.status(201).json(newFrReq);
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Accepts a friend request, creating a friendship.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const acceptFrReq = async (req, res) => {
    try {
        const frreq = await FriendshipRequest.findById(req.params.id);
        if (!frreq) {
            return res.status(404).json({ message: 'Friendship request not found' });
        }

        // Update request status and create a friendship
        frreq.status = 'accepted';
        await frreq.save();

        const newFriendship = new Friendship({ user1: frreq.sender, user2: frreq.receiver });
        await newFriendship.save();

        res.status(200).json(frreq);
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Declines a friend request.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const declineFrReq = async (req, res) => {
    try {
        const frreq = await FriendshipRequest.findById(req.params.id);
        if (!frreq) {
            return res.status(404).json({ message: 'Friendship request not found' });
        }

        // Update request status to declined
        frreq.status = 'declined';
        await frreq.save();

        res.status(200).json(frreq);
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Retrieves pending friend requests for a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPendingFrReq = async (req, res) => {
    try {
        const frReqs = await FriendshipRequest.find({ receiver: req.params.userId, status: 'pending' });
        
        const frReqsWithUsernames =  await Promise.all(frReqs.map(async (frreq) => {
            try{
                const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${frreq.sender}`)
                const username = userResp.data.username;
                
                return {
                    _id: frreq._id,
                    sender: frreq.sender,
                    senderUsername: username,
                    receiver: frreq.receiver,
                    status: frreq.status,
                    createdAt: frreq.createdAt
                }
            } catch{
                console.log("Failed to find user");
                return {
                    _id: frreq._id,
                    sender: frreq.sender,
                    senderUsername: "Unknown",
                    receiver: frreq.receiver,
                    status: frreq.status,
                    createdAt: frreq.createdAt
                }
            }
        }))
        
        return res.status(200).json(frReqsWithUsernames);
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Retrieves a user's friends by fetching friendships and requesting user details from the authentication service.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserFriends = async (req, res) => {
    try {
        const user_id = req.params.userId;
        
        const friendships = await Friendship.find({
            $or: [
                { user1: user_id },
                { user2: user_id }
            ]
        });

        const friendIds = friendships.map(friendship =>
            friendship.user1.toString() === user_id ? friendship.user2 : friendship.user1
        );

        const friends = await Promise.all(friendIds.map(async (fid) => {
            try {
                const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${fid}`);
                return userResp.data;
            } catch {
                return { username: 'unknown', email: 'unknown' };
            }
        }));

        return res.status(200).json(friends);
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Checks if two users are friends.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const areTheyFriends = async (req, res) => {
    try {
        const { id1, id2 } = req.params;
        
        const friendshipExists = await Friendship.findOne({
            $or: [
                { user1: id1, user2: id2 },
                { user2: id1, user1: id2 }
            ]
        });

        if (friendshipExists) {
            return res.status(200).json({ friendshipExists: true });
        }

        const frReqExists = await FriendshipRequest.findOne({
            $or: [
                { sender: id1, receiver: id2 },
                { sender: id2, receiver: id1 }
            ]
        });

        return res.status(200).json({ frReqExists: Boolean(frReqExists) });
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Removes a friendship between two users.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const removeFriend = async (req, res) => {
    try {
        const { id1, id2 } = req.params;
        
        const friendshipExists = await Friendship.findOne({
            $or: [
                { user1: id1, user2: id2 },
                { user2: id1, user1: id2 }
            ]
        });

        if (!friendshipExists) {
            return res.status(404).json({ message: 'Friendship not found' });
        }

        await Friendship.deleteOne({
            $or: [
                { user1: id1, user2: id2 },
                { user2: id1, user1: id2 }
            ]
        });

        return res.status(200).json({ message: 'Friendship removed successfully' });
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

const deleteUserFrReqsAndFrShips = async (req, res) => {
    try {
        const user = req.params.id;

        await Friendship.deleteMany({$or: [{user1: user}, {user2: user}]});
        await FriendshipRequest.deleteMany({$or: [{sender: user}, {receiver: user}]});
        
        console.log("frreqs are deleted");
        
        return res.status(200).json({message: 'Deleted all freindship stuff successfully'})
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });  
    }
}

module.exports = {
    sendFrReq,
    acceptFrReq,
    declineFrReq,
    getPendingFrReq,
    getUserFriends,
    areTheyFriends,
    removeFriend,
    deleteUserFrReqsAndFrShips
};
