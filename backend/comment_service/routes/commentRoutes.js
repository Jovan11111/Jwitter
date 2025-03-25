const express = require('express');
const {addComment, deleteComment, replyToComment, getPostComments, getUserComments, getCommentById} = require('../controllers/commentController');

const router = express.Router();

/**
 * 
 */
router.post('/addComment', addComment);

/**
 * 
 */
router.delete('/deleteComment/:id', deleteComment);

/**
 * 
 */
router.post('replyToComment/:id', replyToComment)

/**
 * 
 */
router.get('/getPostComments/:id', getPostComments);

/**
 * 
 */
router.get('getUserComments/:id', getUserComments);

/**
 * 
 */
router.get('getCommentById/:id', getCommentById);

module.exports = router;