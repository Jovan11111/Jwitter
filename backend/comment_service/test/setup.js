const mongoose = require("mongoose");
const app = require("../server");
const Comment = require("../models/Comment")

let server;
let comments = {};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  userid1 = new mongoose.Types.ObjectId();
  userid2 = new mongoose.Types.ObjectId();
  userid3 = new mongoose.Types.ObjectId();
  postid = new mongoose.Types.ObjectId();

  // Delete comment
  comments.commentToBeDeleted = await Comment.create({
    user: userid1,
    post: postid,
    content: "This comment will be deleted"
  });

  // Delete user comments
  comments.commentToBeDeleted1 = await Comment.create({
    user: userid2,
    post: postid,
    content: "Thic comment will be deleted"
  });

  comments.commentToBeDeleted2 = await Comment.create({
    user: userid2,
    post: postid,
    content: "This comment will be deleted"
  });

  comments.commentToBeDeleted3 = await Comment.create({
    user: userid2,
    post: postid,
    content: "This comment will be deleted"
  });

  // Get comment by id
  comments.getComment = await Comment.create({
    user: userid1,
    post: postid,
    content: "This comment will be fetched"
  });

  // Get user comments
  comments.userComment1 = await Comment.create({
    user: userid3,
    post: postid,
    content: "This comment will be fetched"
  });

  comments.userComment2 = await Comment.create({
    user: userid3,
    post: postid,
    content: "This comment will be fetched"
  });

  comments.userComment3 = await Comment.create({
    user: userid3,
    post: postid,
    content: "This comment will be fetched"
  });

  // Reply to comment
  comments.parentComment = await Comment.create({
    user: userid1,
    post: postid,
    content: "This is the parrent comment to a new comment"
  });

  global.__COMMENTS__ = comments

  server = app.listen(4004);
  global.__SERVER__ = server;
})

afterAll(async () => {
    await Comment.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
})