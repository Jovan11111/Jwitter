const axios = require('axios');
const FriendshipRequest = require('../models/FriendshipRequest');
const Friendship = require('../models/Friendship');

const sendFrReq = async(req, res) => {
    try {
        const sender = req.params.sender;
        const receiver = req.params.receiver;

        const frreqExists = await FriendshipRequest.findOne({
            $or : [
                {sender, receiver},
                {sender: receiver, receiver: sender}
            ]
        });

        if (frreqExists){
            return res.status(400).json({message: 'Friendship allready exists'});
        }

        const newFrReq = new FriendshipRequest({sender, receiver});
        await newFrReq.save();

        res.status(201).json(newFrReq);
    } catch (error){
        return res.status(500).json({message: `Server error ${error.message}`});
    }
}

const acceptFrReq = async(req, res) => {
    try{
        const frreq = await FriendshipRequest.findById(req.params.id);        
        if (! frreq){
            return res.status(404).json({message: 'Friendship request not found'});
        }

        frreq.status = 'accepted';
        await frreq.save();

        const newFriendship = new Friendship({user1: frreq.sender, user2: frreq.receiver});
        await newFriendship.save();

        res.status(200).json(frreq);
    } catch (error){
        return res.status(500).json({message: `Server error ${error.message}`});
    }
}

const declineFrReq = async(req, res) => {
    try{
        const frreq = await FriendshipRequest.findById(req.params.id);
        if (! frreq){
            return res.status(404).json({message: 'Friendship request not found'});
        }

        frreq.status = 'declined';
        await frreq.save();

        res.status(200).json(frreq);
    } catch (error){
        return res.status(500).json({message: `Server error ${error.message}`});
    }
}

const getPendingFrReq = async(req, res) => {
    try{
        const frReqs = await FriendshipRequest.find({receiver: req.params.user_id, status: 'pending'});
        return res.status(200).json(frReqs);
    } catch(error){
        return res.status(500).json({message: `Server error ${error.message}`});
    }
}

const getUserFriends = async(req, res) => {
    try{
        const user_id = req.params.user_id;

        const friendships = await Friendship.find({
            $or: [
                {user1: user_id}, 
                {user2: user_id}
            ]
        });

        const friendids = friendships.map((friendship) => {
            return friendship.user1.toString() === user_id ? friendship.user2 : friendship.user1;
        });
        
        const friends = await Promise.all(friendids.map(async (fid) => {
            try {
                const userResp = await axios.get(`http://auth-service:5000/api/auth/getUser/${fid}`);
                return userResp.data;
            } catch {
                return {
                    username: 'unknown',
                    email: 'unknown'
                };
            }
        }));

        return res.status(200).json(friends);
    } catch (error){
        return res.status(500).json({message: `Server error ${error.message}`});
    }
}

const areTheyFriends = async(req, res) => {
    try{
        us1 = req.params.id1;
        us2 = req.params.id2;

        const friendshipExists = await Friendship.findOne({
            $or: [
                {user1: us1, user2: us2}, 
                {user2: us1, user1: us2}
            ]
        });
        if (friendshipExists){            
            return res.status(200).json({friendshipexists: true});
        } else{
            const frReqExists = await FriendshipRequest.findOne({
                $or: [
                    {sender: us1, receiver: us2}, 
                    {sender: us2, receiver: us1}
                ]
            });
            if (frReqExists){
                res.status(200).json({frreqexists: true});
            } else{
                res.status(200).json({frreqexists: false});
            }
        }
    } catch (error){
        return res.status(500).json({message: `Server error ${error.message}`});
    }
}

const removeFriend = async(req, res) => {
    try{
        us1 = req.params.id1;
        us2 = req.params.id2;
        
        const friendshipExists = await Friendship.findOne({
            $or: [
                {user1: us1, user2: us2}, 
                {user2: us1, user1: us2}
            ]
        });
        if (! friendshipExists) {
            return res.status(404).json({ message: 'Friendship not found'});
        }

        await Friendship.deleteOne({
            $or: [
                { user1: us1, user2: us2 },
                { user2: us1, user1: us2 }
            ]
        });

        return res.status(200).json({ message: 'Friendship removed successfully'});
    } catch (error){
        return res.status(500).json({message: `Server error ${error.message}`});
    }
}


module.exports = {
    sendFrReq,
    acceptFrReq,
    declineFrReq,
    getPendingFrReq,
    getUserFriends,
    areTheyFriends,
    removeFriend
};