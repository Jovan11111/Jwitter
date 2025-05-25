const request = require("supertest");
const mongoose = require("mongoose");
const Friendship = require("../models/Friendship");
const FriendshipRequest = require("../models/FriendshipRequest");

describe("GET /api/friend/areTheyFriends/:id1/:id2", () => {

    it("should return friendshipExists = true successfully", async () => {
        const { user1, user2 } = global.frships.frshipExists;

        const res = await request(global.__SERVER__)
            .get(`/api/friend/areTheyFriends/${user1}/${user2}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.friendshipExists).toBe(true);
        expect(res.body.frReqExists).toBe(false);
    });

    it("should return frreqExists = true successfully", async () => {
        const { sender, receiver } = global.frreqs.frreqExists;

        const res = await request(global.__SERVER__)
            .get(`/api/friend/areTheyFriends/${sender}/${receiver}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.friendshipExists).toBe(false);
        expect(res.body.frReqExists).toBe(true);
    });

    it("should return 400 if id1 is not valid", async () => {
        const validId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .get(`/api/friend/areTheyFriends/invalid-id/${validId}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid user ID");
    });

    it("should return 400 if id2 is not valid", async () => {
        const validId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .get(`/api/friend/areTheyFriends/${validId}/invalid-id`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid user ID");
    });
});
