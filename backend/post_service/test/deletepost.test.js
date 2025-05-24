const request = require("supertest");
const mongoose = require("mongoose");
const Post = require("../models/Post")

describe("DELETE /api/post/deletePost/:id", () => {

  it("should delete a post successfully", async () => {
    postId = global.__POSTS__.postToBeDeleted._id.toString();
    const res = await request(global.__SERVER__)
      .delete(`/api/post/deletePost/${postId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Post deleted successfully");

    const postInDb = await Post.findById(postId);
    expect(postInDb).toBeNull();
  });

  it("should return 404 for non-existent post ID", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(global.__SERVER__)
      .delete(`/api/post/deletePost/${fakeId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe("Post not found");
  });

  it("should return 400 for invalid post ID", async () => {
    const res = await request(global.__SERVER__)
      .delete(`/api/post/deletePost/1`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe("Invalid post ID");
  });
});
