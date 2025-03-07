const express = require('express');
const {allPosts, deletePost, createPost, getPost} = require("../controllers/postController");

const router = express.Router();

router.get('/allPosts', allPosts);
router.get('/getPost/:id', getPost);
router.delete('/deletePost/:id', deletePost);
router.post('/createPost', createPost);

module.exports = router;