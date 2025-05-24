const request = require("supertest");
const Reaction = require("../models/Reaction");
const mongoose = require("mongoose");

describe("POST /api/post/like", () => {

  it("should like a post (no previous reaction)", async () => {

    postId = global.__POSTS__.likeScenario_newLike._id.toString();
    userId = global.__POSTS__.likeScenario_newLike.user.toString();

    const res = await request(global.__SERVER__)
      .post("/api/post/like")
      .send({ userId, postId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Liked post successfully");

    const reaction = await Reaction.findOne({ user: userId, post: postId });
    expect(reaction).not.toBeNull();
    expect(reaction.reaction).toBe("liked");
  });

  it("should remove like if already liked", async () => {
    postId = global.__POSTS__.likeScenario_alreadyLiked._id.toString();
    userId = global.__POSTS__.likeScenario_alreadyLiked.user.toString();

    const res = await request(global.__SERVER__)
      .post("/api/post/like")
      .send({ userId, postId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Unliked post successfully");

    const reaction = await Reaction.findOne({ user: userId, post: postId });
    expect(reaction).toBeNull();
  });

  it("should replace dislike with like", async () => {
    postId = global.__POSTS__.likeScenario_alreadyDisliked._id.toString();
    userId = global.__POSTS__.likeScenario_alreadyDisliked.user.toString();

    const res = await request(global.__SERVER__)
      .post("/api/post/like")
      .send({ userId, postId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Dislike removed, post liked");

    const reaction = await Reaction.findOne({ user: userId, post: postId });
    expect(reaction).not.toBeNull();
    expect(reaction.reaction).toBe("liked");
  });

  it("should return 404 if post does not exist", async () => {
    const postId = new mongoose.Types.ObjectId();

    const res = await request(global.__SERVER__)
      .post("/api/post/like")
      .send({ userId, postId});

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Post not found");
  });

  it("should return 400 for invalid postId", async () => {
    const res = await request(global.__SERVER__)
      .post("/api/post/like")
      .send({ userId, postId: "invalid" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid post ID");
  });

  it("should return 400 for invalid userId", async () => {
    const res = await request(global.__SERVER__)
      .post("/api/post/like")
      .send({ userId: "invalid", postId });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid user ID");
  });
});
