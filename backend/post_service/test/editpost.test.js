const request = require("supertest");
const Post = require("../models/Post")
const mongoose = require("mongoose")

describe("POST /api/post/editPost", () => {

  it("should successfully update the content of a post", async () => {
    const postId = global.__POSTS__.postToEdit._id.toString();
    
    const res = await request(global.__SERVER__)
      .post("/api/post/editPost")
      .send({ postId, newCont: "Updated content" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Edited post succesfully");

    const updatedPost = await Post.findById(postId);
    expect(updatedPost.content).toBe("Updated content");
  });

  it("should return 404 if post does not exist", async () => {
    const postId = new mongoose.Types.ObjectId();

    const res = await request(global.__SERVER__)
      .post("/api/post/editPost")
      .send({ postId, newCont: "Should fail" });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Post not found");
  });

  it("should return 400 for invalid postId", async () => {
    const res = await request(global.__SERVER__)
      .post("/api/post/editPost")
      .send({ postId: "1", newCont: "Should fail" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid post ID");
  });
});
