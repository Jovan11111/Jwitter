const request = require("supertest");
const mongoose = require("mongoose");
const Friendship = require("../models/Friendship");
const FriendshipRequest = require("../models/FriendshipRequest");

describe("DELETE /api/friend/deleteUserFrReqsAndFrShips/:id", () => {
    it("should successfully delete all friendship requests and friendships for user", async () => {
        const userIdToDelete = global.frreqs.frreq1.sender.toString(); // userid1 iz setupa
        
        // Provera pre brisanja
        const frreqsBefore = await FriendshipRequest.find({
            $or: [{ sender: userIdToDelete }, { receiver: userIdToDelete }]
        });
        const frshipsBefore = await Friendship.find({
            $or: [{ user1: userIdToDelete }, { user2: userIdToDelete }]
        });
        expect(frreqsBefore.length).toBeGreaterThan(0);
        expect(frshipsBefore.length).toBeGreaterThan(0);

        const res = await request(global.__SERVER__)
            .delete(`/api/friend/deleteUserFrReqsAndFrShips/${userIdToDelete}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Deleted all freindships and friendship requests successfully");

        // Provera nakon brisanja
        const frreqsAfter = await FriendshipRequest.find({
            $or: [{ sender: userIdToDelete }, { receiver: userIdToDelete }]
        });
        const frshipsAfter = await Friendship.find({
            $or: [{ user1: userIdToDelete }, { user2: userIdToDelete }]
        });

        expect(frreqsAfter.length).toBe(0);
        expect(frshipsAfter.length).toBe(0);
    });

    it("should return 200 even if there are no frreqs or frships for user", async () => {
        const randomUserId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .delete(`/api/friend/deleteUserFrReqsAndFrShips/${randomUserId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Deleted all freindships and friendship requests successfully");
    });

    it("should return 400 if userId is not valid", async () => {
        const invalidId = "invalid-id";

        const res = await request(global.__SERVER__)
            .delete(`/api/friend/deleteUserFrReqsAndFrShips/${invalidId}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid user ID");
    });
});
