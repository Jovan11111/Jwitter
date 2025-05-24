const request = require("supertest");
const mongoose = require("mongoose");

describe("GET /api/post/userPosts/:id", () => {

  it("should return posts for a valid user", async () => {
    userId = global.__POSTS__.userPost1.user;
    const res = await request(global.__SERVER__)
      .get(`/api/post/userPosts/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    for (const post of res.body) {
      expect(post.user.toString()).toEqual(userId.toString());
    }
  });

  it("should return an empty array for a valid user with no posts", async () => {
    userId = new mongoose.Types.ObjectId();
    const res = await request(global.__SERVER__)
      .get(`/api/post/userPosts/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("should return 400 for invalid user ID format", async () => {
    const res = await request(global.__SERVER__)
      .get(`/api/post/userPosts/invalid-id`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe("Invalid user ID");
  });
});
