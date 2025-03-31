const Comment = require('../models/Comment');
const axios = require('axios');
const mongoose = require('mongoose');

const addComment = async(req, res) => {
    try {
        const {postId, userId, cont} = req.body;

        if(!postId || !cont || !userId){
            return res.status(400).json("Provide needed info for comment");
        }

        const newComment = new Comment({user: userId, post: postId, content: cont});

        await newComment.save();
        res.status(201).json({message: "Created a message successfully"})
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

const deleteComment = async(req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Deleted a comment"})
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

const replyToComment = async(req, res) => {
    try {
        const {postId, userId, cont} = req.body;
        const parentId = req.params.id;

        if(!postId || !userId || !cont || ! parentId){
            res.status(400).json({message: 'Provde needed info for a reply'})
        }

        const newComment = new Comment({user: userId, post: postId, content: cont, parent: parentId});

        await newComment.save();
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
        const comments = await Comment.find({user: req.params.id});
        res.status(200).json(comments);
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message});
    }
}

const getCommentById = async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
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
    getCommentById
}