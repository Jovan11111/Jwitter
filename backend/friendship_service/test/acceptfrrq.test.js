const request = require("supertest");
const mongoose = require("mongoose");
const Friendship = require("../models/Friendship");
const FriendshipRequest = require("../models/FriendshipRequest");

describe("POST /api/friend/acceptFrReq/:id", () => {

    it("should accept fr req successfully", async () => {
        const frReq = await FriendshipRequest.findById(global.frreqs.frReqToBeAccepted._id);
        expect(frReq).not.toBeNull();
        expect(frReq.status).toBe("pending");

        const res = await request(global.__SERVER__)
            .post(`/api/friend/acceptFrReq/${frReq._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Friendship request accepted succesfully");

        const updatedReq = await FriendshipRequest.findById(frReq._id);
        expect(updatedReq.status).toBe("accepted");

        const friendship = await Friendship.findOne({
            $or: [
                { user1: frReq.sender, user2: frReq.receiver },
                { user1: frReq.receiver, user2: frReq.sender }
            ]
        });
        expect(friendship).not.toBeNull();
    });

    it("should return 404 if fr req is not found", async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .post(`/api/friend/acceptFrReq/${nonExistentId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Friendship request not found");
    });

    it("should return 400 if frreq ID is not valid", async () => {
        const res = await request(global.__SERVER__)
            .post(`/api/friend/acceptFrReq/invalid-id`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid friendship request ID");
    });
});
