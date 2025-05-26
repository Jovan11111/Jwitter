const request = require("supertest");
const axios = require('axios');
const mongoose = require('mongoose');
const Post = require('../models/Post');

jest.mock('axios');

describe("GET /api/post/getAppealedPosts", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return list of posts successfully", async () => {
        const userId1 = global.__USER_IDS__.userid1;
        const userId2 = global.__USER_IDS__.userid2;

        const post1 = await Post.create({
            title: 'Appealed Post 1',
            content: 'Content of appealed post 1',
            user: userId1,
            reportStatus: 'appealed',
            numLikes: 5,
            numDislikes: 2
        });

        const post2 = await Post.create({
            title: 'Appealed Post 2', 
            content: 'Content of appealed post 2',
            user: userId2,
            reportStatus: 'appealed',
            numLikes: 3,
            numDislikes: 1
        });

        const res = await request(global.__SERVER__)
            .get("/api/post/getAppealedPosts");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);
        
        expect(res.body[0]._id).toBe(post1._id.toString());
        expect(res.body[0].title).toBe('Appealed Post 1');
        expect(res.body[0].username).toBe('testuser1');
        expect(res.body[0].numLikes).toBe(5);
        
        expect(res.body[1]._id).toBe(post2._id.toString());
        expect(res.body[1].title).toBe('Appealed Post 2');
        expect(res.body[1].username).toBe('testuser2');
        expect(res.body[1].numDislikes).toBe(1);

        await Post.deleteMany({ reportStatus: "appealed" });
    });
    
    it("should return empty array if there are no posts", async () => {
        await Post.deleteMany({ reportStatus: 'appealed' });

        const res = await request(global.__SERVER__)
            .get("/api/post/getAppealedPosts");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
        expect(res.body).toHaveLength(0);
    });

    it("should return array of posts with unknown names if user is not recognized", async () => {
        const userId1 = new mongoose.Types.ObjectId();
        
        const post1 = await Post.create({
            title: 'Appealed Post Unknown User',
            content: 'Content from unknown user',
            user: userId1,
            reportStatus: 'appealed',
            numLikes: 0,
            numDislikes: 0
        });

        const res = await request(global.__SERVER__)
            .get("/api/post/getAppealedPosts");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]._id).toBe(post1._id.toString());
        expect(res.body[0].title).toBe('Appealed Post Unknown User');
        expect(res.body[0].username).toBe('Unknown user');

        await Post.deleteMany({ reportStatus: 'appealed'});
    });

    it("should return 500 for axios error", async () => {
        const userId1 = new mongoose.Types.ObjectId();
        
        await Post.create({
            title: 'Test Post',
            content: 'Test content',
            user: userId1,
            reportStatus: 'appealed'
        });

        axios.get.mockImplementation(() => {
            throw new Error('Critical network error');
        });

        const res = await request(global.__SERVER__)
            .get("/api/post/getAppealedPosts");

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toContain("Server error");

        await Post.deleteMany({ reportStatus: 'appealed' });
    });
});