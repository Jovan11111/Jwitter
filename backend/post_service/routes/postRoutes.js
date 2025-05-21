const express = require('express');
const { visiblePosts, 
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
        acceptAppeal,
        declineAppeal,
        getAppealedPosts,
        allPosts,
        editPost
    } = require("../controllers/postController");

const router = express.Router();
 
/**
 * @route GET /api/post/visiblePosts
 * @desc Get all posts
 * @access Public
 */
router.get('/visiblePosts/:id', visiblePosts); // Get all posts

/**
 * @route GET /api/post/getPost/:id/:uid
 * @desc Get a single post by ID
 * @access Public
 */
router.get('/getPost/:id/:uid', getPost); // Get a single post by ID

/**
 * @route DELETE /api/post/deletePost/:id
 * @desc Delete a post by ID
 * @access Private (Only the post owner or admin should be allowed)
 */
router.delete('/deletePost/:id', deletePost); // Delete a post by ID

/**
 * @route POST /api/post/createPost
 * @desc Create a new post
 * @access Private (Only authenticated users should be allowed)
 */
router.post('/createPost', createPost); // Create a new post

/**
 * @route GET /api/post/userPosts/:id
 * @desc Get all posts by a specific user
 * @access Public
 */
router.get('/userPosts/:id', userPosts); // Get all posts by a specific user

/**
 * @route POST /api/post/like 
 * @desc Like a post, or remove a like
 * @access Public
 */
router.post('/like', likePost);

/**
 * @route POST /api/post/dislike 
 * @desc Disike a post, or remove a dislike
 * @access Public
 */
router.post('/dislike', dislikePost);

/**
 * 
 */
router.delete('/deleteUserPosts/:id', deleteUserPosts);

/**
 * 
 */
router.get('/getUserLikes/:id/:lid', getUserLikes);

/**
 * 
 */
router.post('/reportPost/:id', reportPost);

/**
 * 
 */
router.get('/searchPosts/:query/:id', searchPosts);

/**
 * 
 */
router.post('/appeal/:id', appealPost);

/**
 * 
 */
router.post('/acceptAppeal/:id', acceptAppeal);

/**
 * 
 */
router.post('/declineAppeal/:id', declineAppeal);

/**
 * 
 */
router.get('/getAppealedPosts', getAppealedPosts);

/**
 * 
 */
router.get('/allPosts', allPosts);

/**
 * 
 */
router.post('/editPost', editPost);

// Export the router
module.exports = router;
