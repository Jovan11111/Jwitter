const Post = require("../models/Post")
const axios = require('axios')

const allPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
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

        const userExists =  await axios.get(`http://localhost:5000/api/auth/getUser/${user}`)
        console.log(userExists);
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

module.exports = {
    allPosts,
    deletePost,
    createPost,
    getPost
}