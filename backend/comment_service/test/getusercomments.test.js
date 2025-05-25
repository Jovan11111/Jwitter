const request = require("supertest");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

describe("GET /api/comment/getUserComments/:id", () => {
    it("should return comments successfully", async () => {
        const userId = global.__COMMENTS__.userComment1.user.toString();

        const res = await request(global.__SERVER__)
            .get(`/api/comment/getUserComments/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(3);
        
        const contents = res.body.map(c => c.content);
        expect(contents).toEqual(
            expect.arrayContaining([
                "This comment will be fetched",
                "This comment will be fetched",
                "This comment will be fetched"
            ])
        );
    });

    it("should return 200 and an empty array if there are no comments", async () => {
        const userWithNoComments = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .get(`/api/comment/getUserComments/${userWithNoComments}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });

    it("should return 400 if userId is invalid", async () => {
        const res = await request(global.__SERVER__)
            .get(`/api/comment/getUserComments/invalid-id`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid user ID");
    });
});
