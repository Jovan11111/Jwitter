const request = require("supertest");
const Post = require("../models/Post");
const mongoose = require("mongoose");

describe("POST /api/post/appeal/:id", () => {

  it("should set reportStatus to appealed", async () => {
    const postId = global.__POSTS__.postToAppeal._id.toString();
    const res = await request(global.__SERVER__)
      .post(`/api/post/appeal/${postId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Appaeal succesfully sent");

    const post = await Post.findById(postId);
    expect(post.reportStatus).toBe("appealed");
  });

  it("should return 404 if post does not exist", async () => {
    const postId = new mongoose.Types.ObjectId();

    const res = await request(global.__SERVER__)
      .post(`/api/post/appeal/${postId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Post not found");
  });

  it("should return 400 for invalid postId", async () => {
    const res = await request(global.__SERVER__)
      .post("/api/post/appeal/invalid");

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid post ID");
  });
});
