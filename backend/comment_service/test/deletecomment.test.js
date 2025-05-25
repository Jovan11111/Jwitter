const request = require("supertest");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

describe("DELETE /api/comment/deleteComment/:id", () => {

    it("should successfully delete a comment", async () => {
        const commentId = global.__COMMENTS__.commentToBeDeleted._id.toString();

        const res = await request(global.__SERVER__)
            .delete(`/api/comment/deleteComment/${commentId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Comment deleted successfully");

        const commentInDb = await Comment.findById(commentId);
        expect(commentInDb).toBeNull();
    });

    it("should return 404 if comment is not found", async () => {
        const nonExistingId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .delete(`/api/comment/deleteComment/${nonExistingId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Comment not found");
    });

    it("should return 400 if commentId is not valid", async () => {
        const res = await request(global.__SERVER__)
            .delete(`/api/comment/deleteComment/invalid-id`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid comment ID");
    });

});
