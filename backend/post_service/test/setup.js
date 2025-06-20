const mongoose = require("mongoose");
const app = require("../server");
const Post = require("../models/Post");
const Reaction = require("../models/Reaction");

jest.mock('axios');
const axios = require('axios');

let server;
let userid1;
let posts = {};
let reactions = {};


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    userid1 = new mongoose.Types.ObjectId();
    userid2 = new mongoose.Types.ObjectId();

    // DELETE POST test
    posts.postToBeDeleted = await Post.create({
        title: 'To be deleted',
        content: 'This post will be deleted.',
        user: userid1
    });

    // USER POSTS test
    posts.userPost1 = await Post.create({
        title: 'User Post 1',
        content: 'First post from user.',
        user: userid1
    });

    posts.userPost2 = await Post.create({
        title: 'User Post 2',
        content: 'Second post from user.',
        user: userid1
    });

    // LIKE POST test
    posts.likeScenario_newLike = await Post.create({
        title: 'New Like',
        content: 'No reaction yet.',
        user: userid1
    });

    posts.likeScenario_alreadyLiked = await Post.create({
        title: 'Already Liked',
        content: 'User already liked this.',
        user: userid1,
        numLikes: 1
    });

    reactions.alreadyLiked = await Reaction.create({
        user: userid1,
        post: posts.likeScenario_alreadyLiked._id,
        reaction: 'liked'
    });

    posts.likeScenario_alreadyDisliked = await Post.create({
        title: 'Already Disliked',
        content: 'User already disliked this.',
        user: userid1,
        numDislikes: 1
    });

    reactions.alreadyDisliked = await Reaction.create({
        user: userid1,
        post: posts.likeScenario_alreadyDisliked._id,
        reaction: 'disliked'
    });

    // DISLIKE POST test
    posts.dislikeScenario_newDislike = await Post.create({
        title: 'New Dislike',
        content: 'No reaction yet.',
        user: userid1
    });

    posts.dislikeScenario_alreadyDisliked = await Post.create({
        title: 'Already Disliked',
        content: 'User already disliked this.',
        user: userid1,
        numDislikes: 1
    });

    reactions.alreadyDisliked2 = await Reaction.create({
        user: userid1,
        post: posts.dislikeScenario_alreadyDisliked._id,
        reaction: 'disliked'
    });

    posts.dislikeScenario_alreadyLiked = await Post.create({
        title: 'Already Liked',
        content: 'User already liked this.',
        user: userid1,
        numLikes: 1
    });

    reactions.alreadyLiked2 = await Reaction.create({
        user: userid1,
        post: posts.dislikeScenario_alreadyLiked._id,
        reaction: 'liked'
    });

    // DELETE USER POSTS test
    posts.deleteUserPost1 = await Post.create({
        title: 'Delete User Post 1',
        content: 'This will be deleted when user is deleted.',
        user: userid2
    });

    posts.deleteUserPost2 = await Post.create({
        title: 'Delete User Post 2',
        content: 'Another post from same user.',
        user: userid2
    });

    reactions.userReaction1 = await Reaction.create({
        user: userid1,
        post: posts.deleteUserPost1._id,
        reaction: 'liked'
    });

    // APPEAL POST test
    posts.postToAppeal = await Post.create({
        title: 'Appealable post',
        content: 'This post will be appealed.',
        user: userid1,
        reportStatus: 'deleted'
    });

    // EDIT POST test
    posts.postToEdit = await Post.create({
        title: 'Editable Post',
        content: 'Old content',
        user: userid1
    });

    // GET POST test
    posts.getPost = await Post.create({
        title: 'Psot to be gotten',
        content: 'Content to be gotten',
        user: userid1
    })
    reactions.getPostRection = await Reaction.create({
        user: userid1,
        post: posts.getPost._id,
        reaction: "liked"
    })

    const mockUser1 = {
        _id: userid1.toString(),
        username: 'testuser1',
        email: 'test1@example.com',
        role: 'user'
    };

    const mockUser2 = {
        _id: userid1.toString(),
        username: 'testuser2',
        email: 'test2@example.com',
        role: 'user'
    };
    
    axios.get.mockImplementation((url) => {
        if (url.includes('/api/auth/user/')) {
            const userId = url.split('/').pop();
            if (userId === userid1.toString()) {
                return Promise.resolve({ data: mockUser1 });
            }
            else if (userId === userid2.toString()) {
                return Promise.resolve({ data: mockUser2 });
            }
            else {
                return Promise.resolve({ data: null });
            }
        }
        return Promise.reject(new Error('Unknown endpoint'));
    });
    
    global.__MOCK_USERS__ = {mockUser1, mockUser2};

    global.__POSTS__ = posts;
    global.__REACTIONS__ = reactions;
    global.__USER_IDS__ = { userid1, userid2};


    server = app.listen(4001);
    global.__SERVER__ = server;
})

afterAll(async () => {
    await Post.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
})