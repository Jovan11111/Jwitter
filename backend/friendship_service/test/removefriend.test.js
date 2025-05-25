const request = require("supertest");
const mongoose = require("mongoose");
const Friendship = require("../models/Friendship");
const FriendshipRequest = require("../models/FriendshipRequest");

describe("DELETE /api/friend/removeFriend/:id1/:id2", () => {
    it("should successfully remove friendship", async () => {
        const id1 = global.frships.frshipToBeDeleted.user1.toString();
        const id2 = global.frships.frshipToBeDeleted.user2.toString();

        // Provera da li postoji prijateljstvo pre brisanja
        const frshipBefore = await Friendship.findOne({
            $or: [
                { user1: id1, user2: id2 },
                { user1: id2, user2: id1 }
            ]
        });
        expect(frshipBefore).not.toBeNull();

        const res = await request(global.__SERVER__)
            .delete(`/api/friend/removeFriend/${id1}/${id2}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Friendship removed successfully");

        // Provera da li je prijateljstvo obrisano
        const frshipAfter = await Friendship.findOne({
            $or: [
                { user1: id1, user2: id2 },
                { user1: id2, user2: id1 }
            ]
        });
        expect(frshipAfter).toBeNull();
    });

    it("should return 404 if friendship doesn't exist", async () => {
        const randomId1 = new mongoose.Types.ObjectId();
        const randomId2 = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .delete(`/api/friend/removeFriend/${randomId1}/${randomId2}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Friendship not found");
    });

    it("should return 400 if id1 is not valid", async () => {
        const invalidId = "invalid-id";
        const validId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .delete(`/api/friend/removeFriend/${invalidId}/${validId}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid user ID");
    });

    it("should return 400 if id2 is not valid", async () => {
        const validId = new mongoose.Types.ObjectId();
        const invalidId = "invalid-id";

        const res = await request(global.__SERVER__)
            .delete(`/api/friend/removeFriend/${validId}/${invalidId}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid user ID");
    });
});
