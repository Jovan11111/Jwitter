const Post = require("../models/Post");
const axios = require('axios');
const mongoose = require('mongoose');
const Reaction = require("../models/Reaction");

const allPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        const postsWithUserNames = await Promise.all(posts.map(async (post) => {
            try {
                const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${post.user}`)
                const username = userResp.data.username
                
                return {
                    _id: post._id,
                    _v: post._v,
                    title: post.title ,
                    content: post.content, 
                    user: post.user,
                    createdAt: post.createdAt,
                    username: username,
                    numLikes: post.numLikes,
                    numDislikes: post.numDislikes
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
                    numDislikes: post.numDislikes

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

module.exports = {
    allPosts,
    deletePost,
    createPost,
    getPost,
    userPosts,
    likePost,
    dislikePost,
    deleteUserPosts,
    getUserLikes
}