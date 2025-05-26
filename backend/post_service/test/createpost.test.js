const request = require("supertest");
const axios = require('axios');
const { default: mongoose } = require("mongoose");

jest.mock('axios');

describe("POST /api/post/createPost", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create post successfully for existing user", async () => {
    axios.get.mockResolvedValue({ data: global.__MOCK_USERS__.mockUser1._id });

    const postData = {
      title: "Test Post",
      content: "Test content",
      user: global.__MOCK_USERS__.mockUser1._id
    };

    const res = await request(global.__SERVER__)
      .post("/api/post/createPost")
      .send(postData);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Post");
    expect(axios.get).toHaveBeenCalledWith(`http://auth-service:5000/api/auth/user/${postData.user}`);
  });

  it("should return 400 for non-existing user", async () => {
    axios.get.mockResolvedValue({ data: null });

    const postData = {
      title: "Test Post",
      content: "Test content",
      user: new mongoose.Types.ObjectId().toString()
    };

    const res = await request(global.__SERVER__)
      .post("/api/post/createPost")
      .send(postData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User not found");
  });

  it("should handle axios error", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const postData = {
      title: "Test Post",
      content: "Test content", 
      user: new mongoose.Types.ObjectId().toString()
    };

    const res = await request(global.__SERVER__)
      .post("/api/post/createPost")
      .send(postData);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toContain("Server error");
  });

  it("should return 400 if title is not sent", async () => {
    axios.get.mockResolvedValue({ data: global.__MOCK_USER__ });

    const postData = {
      content: "Test content",
      user: global.__MOCK_USERS__.mockUser1._id
    };

    const res = await request(global.__SERVER__)
      .post("/api/post/createPost")
      .send(postData);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Provide needed info for post");
  });

  it("should return 400 if content is not sent", async () => {
    axios.get.mockResolvedValue({ data: global.__MOCK_USER__ });

    const postData = {
      title: "Test title",
      user: global.__MOCK_USERS__.mockUser1._id
    };

    const res = await request(global.__SERVER__)
      .post("/api/post/createPost")
      .send(postData);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Provide needed info for post");
  });

  it("should return 400 if user is not sent", async () => {
    axios.get.mockResolvedValue({ data: global.__MOCK_USER__ });

    const postData = {
      title: "Test title",
      content: "Test content"
    };

    const res = await request(global.__SERVER__)
      .post("/api/post/createPost")
      .send(postData);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Provide needed info for post");
  });

  it("should return 400 if user id is not valid", async () => {
    axios.get.mockResolvedValue({ data: global.__MOCK_USER__ });

    const postData = {
      title: "Test title",
      content: "Test content",
      user: "invalid"
    };

    const res = await request(global.__SERVER__)
      .post("/api/post/createPost")
      .send(postData);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid user ID");
  })
});