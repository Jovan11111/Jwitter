const request = require("supertest");
const axios = require('axios');
const mongoose = require('mongoose');

jest.mock('axios');

describe("GET /api/post/getPost/:id/:uid", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return info with user reaction", async () => {
        const postId = global.__POSTS__.getPost._id.toString();
        const userId = global.__USER_IDS__.userid1.toString();

        const res = await request(global.__SERVER__)
            .get(`/api/post/getPost/${postId}/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(postId);
        expect(res.body.title).toBe('Psot to be gotten');
        expect(res.body.content).toBe('Content to be gotten');
        expect(res.body.username).toBe('testuser1');
        expect(res.body.userReaction).toBe('liked'); 
        expect(axios.get).toHaveBeenCalledWith(`http://auth-service:5000/api/auth/user/${global.__USER_IDS__.userid1.toString()}`);
    });

    it("should return info if there is no user reaction", async () => {
        const postId = global.__POSTS__.getPost._id.toString();
        const userId = global.__USER_IDS__.userid2.toString();

        const res = await request(global.__SERVER__)
            .get(`/api/post/getPost/${postId}/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(postId);
        expect(res.body.title).toBe('Psot to be gotten');
        expect(res.body.username).toBe('testuser1');
        expect(res.body.userReaction).toBe('no');
        expect(axios.get).toHaveBeenCalledWith(`http://auth-service:5000/api/auth/user/${global.__USER_IDS__.userid1.toString()}`);
    });

    it("should return info with username unknown if user is not found", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: null }));

        const postId = global.__POSTS__.getPost._id.toString();
        const userId = global.__USER_IDS__.userid1.toString();

        const res = await request(global.__SERVER__)
            .get(`/api/post/getPost/${postId}/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(postId);
        expect(res.body.title).toBe('Psot to be gotten');
        expect(res.body.username).toBe('Unknown');
        expect(res.body.userReaction).toBe('Unknown');
    });

    it("should return 400 if user id is invalid", async () => {
        const postId = global.__POSTS__.getPost._id.toString();
        const invalidUserId = "invalid-user-id";

        const res = await request(global.__SERVER__)
            .get(`/api/post/getPost/${postId}/${invalidUserId}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid user ID");
    });

    it("should return 400 if post id is invalid", async () => {
        const invalidPostId = "invalid-post-id";
        const userId = global.__USER_IDS__.userid1.toString();

        const res = await request(global.__SERVER__)
            .get(`/api/post/getPost/${invalidPostId}/${userId}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid post ID");
    });

    it("should return 404 if post is not found", async () => {
        const nonExistentPostId = new mongoose.Types.ObjectId().toString();
        const userId = global.__USER_IDS__.userid1.toString();

        const res = await request(global.__SERVER__)
            .get(`/api/post/getPost/${nonExistentPostId}/${userId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toBe("Could not find post by id");
    });

    it("should return 500 for axios error", async () => {
        // Mock axios error
        axios.get.mockRejectedValue(new Error("Network error"));

        const postId = global.__POSTS__.getPost._id.toString();
        const userId = global.__USER_IDS__.userid1.toString();

        const res = await request(global.__SERVER__)
            .get(`/api/post/getPost/${postId}/${userId}`);

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toContain("Server error");
    });
});