const request = require("supertest");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

describe("GET /api/comment/getCommentById/:id", () => {

    it("should return a comment successfully", async () => {
        const comment = global.__COMMENTS__.getComment;
        const commentId = comment._id.toString();

        const res = await request(global.__SERVER__)
            .get(`/api/comment/getCommentById/${commentId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.comment._id).toBe(commentId);
        expect(res.body.comment.content).toBe(comment.content);
        expect(res.body.comment.user).toBe(comment.user.toString());
        expect(res.body.comment.post).toBe(comment.post.toString());
    });

    it("should return 404 if comment is not found", async () => {
        const nonExistingId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .get(`/api/comment/getCommentById/${nonExistingId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Comment not found");
    });

    it("should return 400 if commentId is not valid", async () => {
        const res = await request(global.__SERVER__)
            .get(`/api/comment/getCommentById/invalid-id`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid comment ID");
    });

});
