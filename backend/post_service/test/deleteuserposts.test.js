const mongoose = require("mongoose");
const request = require("supertest");
const Post = require("../models/Post");
const Reaction = require("../models/Reaction");

describe("POST /api/post/deleteUserPosts/:id", () => {

  it("should delete all posts and reactions by the user", async () => {
    const userId = global.__POSTS__.deleteUserPost1.user.toString();
    const anotherUserId = global.__POSTS__.userPost1.user.toString();
    const res = await request(global.__SERVER__)
      .delete(`/api/post/deleteUserPosts/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User posts and reactions deleted");

    const posts = await Post.find({ user: userId });
    const reactions = await Reaction.find({ user: userId });

    expect(posts.length).toBe(0);
    expect(reactions.length).toBe(0);

    const otherPosts = await Post.find({ user: anotherUserId });
    const otherReactions = await Reaction.find({ user: anotherUserId });
    expect(otherPosts.length).toBeGreaterThan(0);
    expect(otherReactions.length).toBeGreaterThan(0);
  });

  it("should succeed even if user has no posts or reactions", async () => {
    const userId = new mongoose.Types.ObjectId();

    const res = await request(global.__SERVER__)
      .delete(`/api/post/deleteUserPosts/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User posts and reactions deleted");

    const posts = await Post.find({ user: userId });
    const reactions = await Reaction.find({ user: userId });

    expect(posts.length).toBe(0);
    expect(reactions.length).toBe(0);
  });

  it("should return 400 for invalid userId", async () => {
    const res = await request(global.__SERVER__)
      .delete("/api/post/deleteUserPosts/invalid");

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid user ID");
  });
});
