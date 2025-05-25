const request = require("supertest");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

describe("POST /api/comment/replyToComment/:id", () => {
    it("Should reply to comment successfully", async () => {
        const parentId = global.__COMMENTS__.parentComment._id.toString();
        const postId = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .post(`/api/comment/replyToComment/${parentId}`)
            .send({
                postId,
                userId,
                cont: "This is a reply"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.reply.content).toBe("This is a reply");
        expect(res.body.reply.parent).toBe(parentId);
        expect(res.body.reply.post).toBe(postId.toString());
        expect(res.body.reply.user).toBe(userId.toString());

        const commentInDb = await Comment.findById(res.body.reply._id);
        expect(commentInDb).not.toBeNull();
    });

    it("Should return 400 if postId is not sent", async () => {
        const res = await request(global.__SERVER__)
            .post(`/api/comment/replyToComment/${global.__COMMENTS__.parentComment._id}`)
            .send({
                userId: new mongoose.Types.ObjectId(),
                cont: "Missing postId"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Provde needed info for a reply");
    });

    it("Should return 400 if userId is not sent", async () => {
        const res = await request(global.__SERVER__)
            .post(`/api/comment/replyToComment/${global.__COMMENTS__.parentComment._id}`)
            .send({
                postId: new mongoose.Types.ObjectId(),
                cont: "Missing userId"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Provde needed info for a reply");
    });

    it("Should return 400 if content is not sent", async () => {
        const res = await request(global.__SERVER__)
            .post(`/api/comment/replyToComment/${global.__COMMENTS__.parentComment._id}`)
            .send({
                postId: new mongoose.Types.ObjectId(),
                userId: new mongoose.Types.ObjectId()
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Provde needed info for a reply");
    });

    it("Should return 400 if parentId is not sent", async () => {
        const res = await request(global.__SERVER__)
            .post(`/api/comment/replyToComment/`)
            .send({
                postId: new mongoose.Types.ObjectId(),
                userId: new mongoose.Types.ObjectId(),
                cont: "No parentId"
            });

        expect(res.statusCode).toBe(404);
    });

    it("Should return 400 if postId is invalid", async () => {
        const res = await request(global.__SERVER__)
            .post(`/api/comment/replyToComment/${global.__COMMENTS__.parentComment._id}`)
            .send({
                postId: "invalid-id",
                userId: new mongoose.Types.ObjectId(),
                cont: "Invalid postId"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid post ID");
    });

    it("Should return 400 if userId is not valid", async () => {
        const res = await request(global.__SERVER__)
            .post(`/api/comment/replyToComment/${global.__COMMENTS__.parentComment._id}`)
            .send({
                postId: new mongoose.Types.ObjectId(),
                userId: "invalid-user-id",
                cont: "Invalid userId"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid user ID");
    });

    it("Should return 400 if parentId is not valid", async () => {
        const res = await request(global.__SERVER__)
            .post(`/api/comment/replyToComment/invalid-id`)
            .send({
                postId: new mongoose.Types.ObjectId(),
                userId: new mongoose.Types.ObjectId(),
                cont: "Invalid parentId"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid parent ID");
    });

    it("Should return 400 if parentId is not found", async () => {
        const nonExistentParentId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .post(`/api/comment/replyToComment/${nonExistentParentId}`)
            .send({
                postId: new mongoose.Types.ObjectId(),
                userId: new mongoose.Types.ObjectId(),
                cont: "Parent not found"
            });

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Parent comment not found");
    });
});
