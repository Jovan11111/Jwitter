const Post = require("../models/Post")
const axios = require('axios')
const mongoose = require('mongoose')

const allPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        const postsWithUserNames = await Promise.all(posts.map(async (post) => {
            try {
                const userResp = await axios.get(`http://auth-service:5000/api/auth/getUser/${post.user}`)
                const username = userResp.data.username
                
                return {
                    _id: post._id,
                    _v: post._v,
                    title: post.title ,
                    content: post.content, 
                    user: post.user,
                    createdAt: post.createdAt,
                    username: username 
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
                    username: "Unknown user"
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
            return ret.status(400).json("Post not found")
        }
        await post.deleteOne();
        res.status(200).json("Deleted a post")
        
    } catch (error){
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

const createPost = async(req, res) => {
    try {
        const {title, content, user} = req.body;
        if(! title || !content || ! user){
            res.status(400).json("Provide needed info for post")
        }

        const userExists =  await axios.get(`http://auth-service:5000/api/auth/getUser/${user}`)
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

module.exports = {
    allPosts,
    deletePost,
    createPost,
    getPost,
    userPosts
}