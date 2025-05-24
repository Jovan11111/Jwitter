const Post = require("../models/Post");
const axios = require('axios');
const mongoose = require('mongoose');
const Reaction = require("../models/Reaction");
const bcrypt = require("bcryptjs");
const Report = require("../models/Report")

const visiblePosts = async(req, res) => {
    try {
        const loggedUserId = req.params.id;
        const posts = await Post.find({ reportStatus: "clear" });

        const loggedInUserResp = await axios.get(`http://auth-service:5000/api/auth/user/${loggedUserId}`);
        const loggedUserRole = loggedInUserResp.data.role;

        const postsWithUserNames = await Promise.all(posts.map(async (post) => {
            try {
                const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${post.user}`);
                const user = userResp.data;
                const username = user.username;

                const userReaction = await Reaction.findOne({ user: loggedUserId, post: post._id });
                const userReactionString = userReaction ? userReaction.reaction : "no";
                if (loggedUserRole === "admin" || user.postVisibility === "everyone" || loggedUserId === userResp.data._id) {
                    return buildPostObj(post, username, userReactionString);
                } else if (user.postVisibility === "friends") {
                    const friendshipResp = await axios.get(`http://friendship-service:5002/api/friend/areTheyFriends/${loggedUserId}/${userResp.data._id}`);
                    
                    if (friendshipResp.data.friendshipExists === true) {
                        return buildPostObj(post, username, userReactionString);
                    }
                }
            } catch {
                return buildPostObj(post, "Unknown user", "unknown");
            }
        }));

        const visiblePosts = postsWithUserNames.filter(p => p !== undefined);
        return res.status(200).json(visiblePosts);

    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

const buildPostObj = (post, username, userReactionString) => ({
    _id: post._id,
    _v: post._v,
    title: post.title,
    content: post.content,
    user: post.user,
    createdAt: post.createdAt,
    username: username,
    numLikes: post.numLikes,
    numDislikes: post.numDislikes,
    userReaction: userReactionString
});

const deletePost = async(req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({error: "Post not found"})
        }
        await post.deleteOne();
        
        return res.status(200).json({message: "Post deleted successfully"})
        
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
        loggedUserId = req.params.uid;
        const post = await Post.findById(req.params.id);
        
        if(!post){
            return res.status(400).json("Could not find post by id")
        }

        const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${post.user}`)
        const userReaction = await Reaction.findOne({user:loggedUserId, post: post});
        const userReactionString = userReaction ? userReaction.reaction : "no";
        if(userResp){
            return res.status(200).json({
                _id: post._id,
                title: post.title,
                content: post.content,
                user: post.user,
                createdAt: post.createdAt,
                __v: post._v, 
                username: userResp.data.username,
                numLikes: post.numLikes,
                numDislikes: post.numDislikes,
                userReaction: userReactionString
            })
        } else{
            return res.status(200).json({
                _id: post._id,
                title: post.title,
                content: post.content,
                user: post.user,
                createdAt: post.createdAt,
                __v: post._v, 
                username: "Unknown",
                numLikes: post.numLikes,
                numDislikes: post.numDislikes,
                userReaction: "Unknown"
            })
        }

    } catch (error){
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

const userPosts = async(req, res) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const posts = await Post.find({ user: req.params.id });
        return res.status(200).json(posts)
    } catch(error){
        return res.status(500).json({message: "Server error : " + error.message});
    }
}

const likePost = async (req, res) => {
    try {
        const { userId, postId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }
        const reaction = await Reaction.findOne({ user: userId, post: postId });
        const post = await Post.findById(postId);
        if (! post){
            return res.status(404).json({error: "Post not found"})
        }

        if (reaction) {
            if (reaction.reaction === "liked") {
                await Reaction.deleteOne({ _id: reaction._id });
                await Post.findByIdAndUpdate(postId, { $inc: { numLikes: -1 } });

                return res.status(200).json({ message: "Unliked post successfully" });
            } else {
                reaction.reaction = "liked";
                await reaction.save();

                await Post.findByIdAndUpdate(postId, { $inc: { numLikes: 1, numDislikes: -1 } });

                return res.status(200).json({ message: "Dislike removed, post liked" });
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
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }

        const reaction = await Reaction.findOne({ user: userId, post: postId });
        const post = await Post.findById(postId);
        if (! post){
            return res.status(404).json({error: "Post not found"})
        }
        
        if (reaction) {
            if (reaction.reaction === "disliked") {
                await Reaction.deleteOne({ _id: reaction._id });
                await Post.findByIdAndUpdate(postId, { $inc: { numDislikes: -1 } });

                return res.status(200).json({ message: "Undisliked post successfully" });
            } else {
                reaction.reaction = "disliked";
                await reaction.save();

                await Post.findByIdAndUpdate(postId, { $inc: { numLikes: -1, numDislikes: 1 } });

                return res.status(200).json({ message: "Like removed, post disliked" });
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

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const user = req.params.id;

        await Reaction.deleteMany({user: user});
        await Post.deleteMany({user: user});
        
        return res.status(200).json({ message: "User posts and reactions deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

const getUserLikes = async (req, res) => {
    try {
        const userId = req.params.id;
        const loggedUserId = req.params.lid;
        const reactions = await Reaction.find({ user: userId, reaction: "liked" });

        const postIds = reactions.map(reaction => reaction.post);
        const likedPosts = await Post.find({ _id: { $in: postIds } });

        const loggedInUserResp = await axios.get(`http://auth-service:5000/api/auth/user/${loggedUserId}`);
        const loggedUserRole = loggedInUserResp.data.role;

        const postsWithUserNames = await Promise.all(likedPosts.map(async (post) => {
            try {
                const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${post.user}`);
                const user = userResp.data;
                const username = user.username;

                const userReaction = await Reaction.findOne({ user: loggedUserId, post: post._id });
                const userReactionString = userReaction ? userReaction.reaction : "no";
                if (loggedUserRole === "admin" || user.postVisibility === "everyone" || loggedUserId === userResp.data._id) {
                    return buildPostObj(post, username, userReactionString);
                } else if (user.postVisibility === "friends") {
                    const friendshipResp = await axios.get(`http://friendship-service:5002/api/friend/areTheyFriends/${loggedUserId}/${userResp.data._id}`);
                    
                    if (friendshipResp.data.friendshipExists === true) {
                        return buildPostObj(post, username, userReactionString);
                    }
                }
            } catch {
                return buildPostObj(post, "Unknown user", "unknown");
            }
        }));

        const visiblePosts = postsWithUserNames.filter(p => p !== undefined);
        return res.status(200).json(visiblePosts);

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
            await axios.post('http://email-service:5005/api/email/delpost', {to:email, title: post.title, pid: post._id, uid: post.user});
            await Post.findByIdAndUpdate(postId, {reportStatus: "deleted"});
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

/**
 * 
 */
const searchPosts = async(req, res) => {
    try {
        loggedUserId = req.params.id;
        const query = req.params.query;
        const safeQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const posts = await Post.find({title: {$regex: safeQuery, $options: "i"}});

        const loggedInUserResp = await axios.get(`http://auth-service:5000/api/auth/user/${loggedUserId}`);
        const loggedUserRole = loggedInUserResp.data.role;
        
        const postsWithUserNames = await Promise.all(posts.map(async (post) => {
            try {
                const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${post.user}`);
                const user = userResp.data;
                const username = user.username;

                const userReaction = await Reaction.findOne({ user: loggedUserId, post: post._id });
                const userReactionString = userReaction ? userReaction.reaction : "no";
                if (loggedUserRole === "admin" || user.postVisibility === "everyone" || loggedUserId === userResp.data._id) {
                    return buildPostObj(post, username, userReactionString);
                } else if (user.postVisibility === "friends") {
                    const friendshipResp = await axios.get(`http://friendship-service:5002/api/friend/areTheyFriends/${loggedUserId}/${userResp.data._id}`);
                    
                    if (friendshipResp.data.friendshipExists === true) {
                        return buildPostObj(post, username, userReactionString);
                    }
                }
            } catch {
                return buildPostObj(post, "Unknown user", "unknown");
            }
        }));

        const visiblePosts = postsWithUserNames.filter(p => p !== undefined);
        return res.status(200).json(visiblePosts);
    } catch(error){
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

/**
 * 
 */
const appealPost = async(req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }

        const post = await Post.findById(req.params.id);
        if (! post){
            return res.status(404).json({error: "Post not found"});
        }

        post.reportStatus = "appealed";
        await post.save();

        return res.status(200).json({message: "Appaeal succesfully sent"});
    } catch(error){
        return res.status(500).json({message: "Server error: " + error.message})
    }
}

/**
 * 
 */
const getAppealedPosts = async (req, res) => {
    try {
        const posts = await Post.find({reportStatus: "appealed"});
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
        return res.status(200).json(postsWithUserNames);
    } catch(error){
        return res.status(500).json({message: "Server error: " + error.message})
    }
}

/**
 * 
 */
const acceptAppeal = async (req, res) => {
    try {
        const pid = req.params.id;
        const post = await Post.findById(pid);
        
        const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${post.user}`)

        await axios.post('http://email-service:5005/api/email/acceptapp', {to: userResp.data.email, title: post.title});

        await Post.findByIdAndUpdate(pid, {reportScore: 0, reportStatus: "clear"});

        await axios.get(`http://auth-service:5000/api/auth/acceptAppeal/${post.user}`);
        
        return res.status(200).json({message: "Post report status has been cleared"});
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message})
    }
}

/**
 * 
 */
const declineAppeal = async (req, res) => {
    try {
        const pid = req.params.id;
        const post = await Post.findById(pid);
        
        const userResp = await axios.get(`http://auth-service:5000/api/auth/user/${post.user}`)

        await axios.post('http://email-service:5005/api/email/declineapp', {to: userResp.data.email, title: post.title});

        await Post.findByIdAndDelete(pid);

        return res.status(200).json({message: "Post has been perminately deleted"});
    } catch (error){
        return res.status(500).json({message: "Server error: " + error.message})
    }
}

/**
 * 
 */
const allPosts = async (req, res) => {
    try{
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
        return res.status(200).json(postsWithUserNames);
    } catch (error) {
        return res.status(500).json({message: "Server error: " + error.message})
    }
}

/**
 * 
 */
const editPost = async(req, res) => {
    try{
        const {postId, newCont} = req.body;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }

        const post = await Post.findById(postId);
        if (! post){
            return res.status(404).json({error: "Post not found"});
        }

        post.content = newCont;
        await post.save();

        return res.status(200).json({message: "Edited post succesfully"});
    } catch (error) {
        return res.status(500).json({message: "Server error: " + error.message})
    }
}

module.exports = {
    visiblePosts,
    deletePost,
    createPost,
    getPost,
    userPosts,
    likePost,
    dislikePost,
    deleteUserPosts,
    getUserLikes,
    reportPost,
    searchPosts,
    appealPost,
    getAppealedPosts,
    acceptAppeal,
    declineAppeal,
    allPosts,
    editPost
}