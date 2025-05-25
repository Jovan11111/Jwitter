const request = require("supertest");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

describe("POST /api/comment/addComment", () => {
  it("should successfully create a comment", async () => {
    const postId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();
    const cont = "Test comment content";

    const res = await request(global.__SERVER__)
      .post("/api/comment/addComment")
      .send({ postId, userId, cont });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Comment added successfully");
    expect(res.body.comment).toBeDefined();
    expect(res.body.comment.post).toBe(postId.toString());
    expect(res.body.comment.user).toBe(userId.toString());
    expect(res.body.comment.content).toBe(cont);

    const commentInDb = await Comment.findById(res.body.comment._id);
    expect(commentInDb).not.toBeNull();
    expect(commentInDb.post.toString()).toBe(postId.toString());
    expect(commentInDb.user.toString()).toBe(userId.toString());
    expect(commentInDb.content).toBe(cont);
  });

  it("should return 400 if postId is not sent", async () => {
    const userId = new mongoose.Types.ObjectId();
    const cont = "Test comment content";

    const res = await request(global.__SERVER__)
      .post("/api/comment/addComment")
      .send({ userId, cont });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Provide needed info for comment");
  });

  it("should return 400 if userId is not sent", async () => {
    const postId = new mongoose.Types.ObjectId();
    const cont = "Test comment content";

    const res = await request(global.__SERVER__)
      .post("/api/comment/addComment")
      .send({ postId, cont });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Provide needed info for comment");
  });

  it("should return 400 if content is not sent", async () => {
    const postId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    const res = await request(global.__SERVER__)
      .post("/api/comment/addComment")
      .send({ postId, userId });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Provide needed info for comment");
  });

  it("should return 400 if userId is not valid", async () => {
    const postId = new mongoose.Types.ObjectId();
    const cont = "Test comment content";

    const res = await request(global.__SERVER__)
      .post("/api/comment/addComment")
      .send({ postId, userId: "invalid", cont });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid user ID");
  });

  it("should return 400 if postId is not valid", async () => {
    const userId = new mongoose.Types.ObjectId();
    const cont = "Test comment content";

    const res = await request(global.__SERVER__)
      .post("/api/comment/addComment")
      .send({ postId: "invalid", userId, cont });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid post ID");
  });
});
