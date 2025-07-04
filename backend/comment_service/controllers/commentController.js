const Comment = require('../models/Comment');
const axios = require('axios');
const mongoose = require("mongoose");

const addComment = async(req, res) => {
    try {
        const {postId, userId, cont} = req.body;

        if(!postId || !cont || !userId){
            return res.status(400).json({error: "Provide needed info for comment"});
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const newComment = new Comment({user: userId, post: postId, content: cont});

        await newComment.save();
        return res.status(201).json({message: "Comment added successfully", comment: newComment});
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

const deleteComment = async(req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid comment ID" });
        }
        const comment = await Comment.findById(req.params.id);
        if (! comment) {
            return res.status(404).json({error: "Comment not found"});
        }
        await comment.deleteOne();

        return res.status(200).json({message: "Comment deleted successfully"});
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

const replyToComment = async(req, res) => {
    try {
        const {postId, userId, cont} = req.body;
        const parentId = req.params.id;

        if(!postId || !userId || !cont || ! parentId){
            return res.status(400).json({error: 'Provde needed info for a reply'})
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(parentId)) {
            return res.status(400).json({ error: "Invalid parent ID" });
        }

        parent = await Comment.findById(parentId);
        if(! parent){
            return res.status(404).json({error: "Parent comment not found"});
        }

        const newComment = new Comment({user: userId, post: postId, content: cont, parent: parentId});

        await newComment.save();

        return res.status(201).json({message: "Added reply succefully", reply: newComment});
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

const getPostComments = async(req, res) => {
    try {
        const comments = await Comment.find({post: req.params.id});

        const commentsWithUsernames = await Promise.all(comments.map(async (comm) => {
            try {
                const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${comm.user}`)
                const username = userResp.data.username;

                return {
                    user: comm.user,
                    username: username,
                    post: comm.post,
                    content: comm.content,
                    parent: comm.parent,
                    createdAt: comm.createdAt
                }
            } catch{
                console.log("Failed to find user");
                return {
                    user: comm.user,
                    username: "Unknown",
                    post: comm.post,
                    content: comm.content,
                    parent: comm.parent,
                    createdAt: comm.createdAt
                }
            }
        }))
        res.status(200).json(commentsWithUsernames);
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

const getUserComments = async(req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const comments = await Comment.find({user: req.params.id});
        res.status(200).json(comments);
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

const getCommentById = async(req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid comment ID" });
        }

        const comment = await Comment.findById(req.params.id);
        if(! comment){
            return res.status(404).json({error: "Comment not found"});

        }
        res.status(200).json({comment});
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

const deleteUserComments = async(req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const user = req.params.id;

        await Comment.deleteMany({user: user});
        return res.status(200).json({message: "User comments deleted successfully"});
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

module.exports = {
    addComment,
    deleteComment,
    replyToComment,
    getPostComments,
    getUserComments,
    getCommentById,
    deleteUserComments
}