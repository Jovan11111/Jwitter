const request = require("supertest");
const Reaction = require("../models/Reaction")
const mongoose = require("mongoose");

describe("POST /api/post/dislike", () => {

  it("should dislike a post (no previous reaction)", async () => {
    postId = global.__POSTS__.dislikeScenario_newDislike._id.toString();
    userId = global.__POSTS__.dislikeScenario_newDislike.user.toString();

    const res = await request(global.__SERVER__)
      .post("/api/post/dislike")
      .send({ userId, postId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Disliked post successfully");

    const reaction = await Reaction.findOne({ user: userId, post: postId });
    expect(reaction).not.toBeNull();
    expect(reaction.reaction).toBe("disliked");
  });

  it("should remove dislike if already disliked", async () => {
    postId = global.__POSTS__.dislikeScenario_alreadyDisliked._id.toString();
    userId = global.__POSTS__.dislikeScenario_alreadyDisliked.user.toString();

    const res = await request(global.__SERVER__)
      .post("/api/post/dislike")
      .send({ userId, postId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Undisliked post successfully");

    const reaction = await Reaction.findOne({ user: userId, post: postId });
    expect(reaction).toBeNull();
  });

  it("should replace like with dislike", async () => {
    postId = global.__POSTS__.dislikeScenario_alreadyLiked._id.toString();
    userId = global.__POSTS__.dislikeScenario_alreadyLiked.user.toString();

    const res = await request(global.__SERVER__)
      .post("/api/post/dislike")
      .send({ userId, postId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Like removed, post disliked");

    const reaction = await Reaction.findOne({ user: userId, post: postId });
    expect(reaction).not.toBeNull();
    expect(reaction.reaction).toBe("disliked");
  });

  it("should return 404 if post does not exist", async () => {
    const postId = new mongoose.Types.ObjectId();

    const res = await request(global.__SERVER__)
      .post("/api/post/dislike")
      .send({ userId, postId});

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Post not found");
  });

  it("should return 400 for invalid postId", async () => {
    const res = await request(global.__SERVER__)
      .post("/api/post/dislike")
      .send({ userId, postId: "invalid" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid post ID");
  });

  it("should return 400 for invalid userId", async () => {
    const res = await request(global.__SERVER__)
      .post("/api/post/dislike")
      .send({ userId: "invalid", postId });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid user ID");
  });
});
