const Post = require("../models/Post");
const axios = require('axios');
const mongoose = require('mongoose');
const Reaction = require("../models/Reaction");
const bcrypt = require("bcryptjs");
const Report = require("../models/Report")

const allPosts = async(req, res) => {
    try {
        loggedUserId = req.params.id;
        const posts = await Post.find();
        const postsWithUserNames = await Promise.all(posts.map(async (post) => {
            try {
                const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${post.user}`)
                const username = userResp.data.username
                const userReaction = await Reaction.findOne({user:loggedUserId, post: post});
                const userReactionString = userReaction ? userReaction.reaction : "no";
                return {
                    _id: post._id,
                    _v: post._v,
                    title: post.title ,
                    content: post.content, 
                    user: post.user,
                    createdAt: post.createdAt,
                    username: username,
                    numLikes: post.numLikes,
                    numDislikes: post.numDislikes,
                    userReaction: userReactionString
                }
            }catch{
                console.log("Failed to find user");
                return {
                    _id: post._id,
                    _v: post._v,
                    title: post.title ,
                    content: post.content, 
                    user: post.user,
                    createdAt: post.createdAt,
                    username: "Unknown user",
                    numLikes: post.numLikes,
                    numDislikes: post.numDislikes,
                    userReaction: "unknown"

                }
            }
        }))
        res.status(200).json(postsWithUserNames)
    } catch (error){
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

const deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json("Post not found")
        }
        await post.deleteOne();
        res.status(200).json({message: "Deleted a post"})
        
    } catch (error){
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

const createPost = async(req, res) => {
    try {
        const {title, content, user} = req.body;
        
        if(! title || !content || ! user){
            return res.status(400).json("Provide needed info for post");
        }

        const userExists =  await axios.get(`http://auth-service:5000/api/auth/user/${user}`)
        if(! userExists.data){
            return res.status(400).json({message: "User not found"})
        }
        const newPost = new Post({title, content, user});

        await newPost.save()
        res.status(201).json(newPost);
    } catch (error){
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

const getPost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if(!post){
            return res.status(400).json("Could not find post by id")
        }

        res.status(200).json(post);
    } catch (error){
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

const userPosts = async(req, res) => {
    try{
        const posts = await Post.find({ user: req.params.id });
        return res.status(200).json(posts)
    } catch(error){
        return res.status(500).json({message: "Server error : " + error.message});
    }
}

const likePost = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        const reaction = await Reaction.findOne({ user: userId, post: postId });

        if (reaction) {
            if (reaction.reaction === "liked") {
                await Reaction.deleteOne({ _id: reaction._id });
                await Post.findByIdAndUpdate(postId, { $inc: { numLikes: -1 } });

                return res.status(200).json({ message: "Unliked post successfully" });
            } else {
                reaction.reaction = "liked";
                await reaction.save();

                await Post.findByIdAndUpdate(postId, { $inc: { numLikes: 1, numDislikes: -1 } });

                return res.status(200).json({ message: "Liked post successfully" });
            }
        } else {
            await Post.findByIdAndUpdate(postId, { $inc: { numLikes: 1 } });

            const newReaction = new Reaction({ user: userId, post: postId, reaction: "liked" });
            await newReaction.save();

            return res.status(200).json({ message: "Liked post successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};


const dislikePost = async (req, res) => {
    try {
        const { userId, postId } = req.body;
        const reaction = await Reaction.findOne({ user: userId, post: postId });

        if (reaction) {
            if (reaction.reaction === "disliked") {
                await Reaction.deleteOne({ _id: reaction._id });
                await Post.findByIdAndUpdate(postId, { $inc: { numDislikes: -1 } });

                return res.status(200).json({ message: "Undisliked post successfully" });
            } else {
                reaction.reaction = "disliked";
                await reaction.save();

                await Post.findByIdAndUpdate(postId, { $inc: { numLikes: -1, numDislikes: 1 } });

                return res.status(200).json({ message: "Disliked post successfully" });
            }
        } else {
            await Post.findByIdAndUpdate(postId, { $inc: { numDislikes: 1 } });

            const newReaction = new Reaction({ user: userId, post: postId, reaction: "disliked" });
            await newReaction.save();

            return res.status(200).json({ message: "Disliked post successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

const deleteUserPosts = async (req, res) => {
    try {
        const user = req.params.id;

        await Reaction.deleteMany({user: user});
        await Post.deleteMany({user: user});
        console.log("posts are deleted");
        
        return res.status(200).json({ message: "User's posts and reactions deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

const getUserLikes = async (req, res) => {
    try {
        const userId = req.params.id;

        const reactions = await Reaction.find({ user: userId, reaction: "liked" });

        const postIds = reactions.map(reaction => reaction.post);

        const likedPosts = await Post.find({ _id: { $in: postIds } });

        return res.status(200).json(likedPosts);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

const reportPost = async (req, res) => {
    try {
        postId = req.params.id;
        const {reportedBy} = req.body;
        const alreadyReported = await Report.findOne({user:reportedBy, post: postId});
        if(alreadyReported){
            return res.status(200).json({message: "Already reported this post"});
        } 
        await Report.create({user: reportedBy, post: postId});
        const post = await Post.findById(postId);
        const aiResponse = await axios.post('http://aireporting-service:8000/rate', {title: post.title, content: post.content})
        score = aiResponse.data.score
        const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${post.user}`)
        if (score + post.reportScore > 50){
            const email = userResp.data.email;
            await axios.post('http://email-service:5005/api/email/delpost', {to:email, title: post.title, content:post.content});
            await Post.findByIdAndDelete(postId);
        } else{
            await Post.findByIdAndUpdate(postId, { $inc: {reportScore: score}})
        }

        if (score + userResp.data.reportScore > 100){
            await axios.post('http://email-service:5005/api/email/delacc', {to: userResp.data.email, username: userResp.data.username});
            await axios.post('http://auth-service:5000/api/auth/deleteProfileNoPass', {userr: post.user});
        } else {
            await axios.post(`http://auth-service:5000/api/auth/reportUser/${post.user}`, {scoree: score});
        }

        return res.status(200).json({message: "Reported a post"});
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

module.exports = {
    allPosts,
    deletePost,
    createPost,
    getPost,
    userPosts,
    likePost,
    dislikePost,
    deleteUserPosts,
    getUserLikes,
    reportPost
}