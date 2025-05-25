const request = require("supertest");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

describe("DELETE /api/comment/deleteUserComments/:id", () => {
    it("should delete user comments successfully", async () => {
        const userId = global.__COMMENTS__.commentToBeDeleted1.user.toString();

        const res = await request(global.__SERVER__)
            .delete(`/api/comment/deleteUserComments/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User comments deleted successfully");

        const remaining = await Comment.find({ user: userId });
        expect(remaining.length).toBe(0);
    });

    it("should return 200 even if there are no comments of that user", async () => {
        const userWithNoComments = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .delete(`/api/comment/deleteUserComments/${userWithNoComments}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User comments deleted successfully");

        const comments = await Comment.find({ user: userWithNoComments });
        expect(comments.length).toBe(0);
    });

    it("should return 400 if userId is not valid", async () => {
        const res = await request(global.__SERVER__)
            .delete(`/api/comment/deleteUserComments/invalid-id`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid user ID");
    });
});
