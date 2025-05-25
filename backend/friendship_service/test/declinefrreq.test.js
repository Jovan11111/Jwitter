const request = require("supertest");
const mongoose = require("mongoose");
const Friendship = require("../models/Friendship");
const FriendshipRequest = require("../models/FriendshipRequest");

describe("POST /api/friend/declineFrReq/:id", () => {
    it("should decline frreq successfully", async () => {
        const frreq = global.frreqs.frReqToBeDeclined;

        const res = await request(global.__SERVER__)
            .post(`/api/friend/declineFrReq/${frreq._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Friendship request declined");

        const updatedReq = await FriendshipRequest.findById(frreq._id);
        expect(updatedReq).not.toBeNull();
        expect(updatedReq.status).toBe("declined");
    });

    it("should return 404 if frreq is not found", async () => {
        const fakeId = new mongoose.Types.ObjectId();

        const res = await request(global.__SERVER__)
            .post(`/api/friend/declineFrReq/${fakeId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Friendship request not found");
    });

    it("should return 400 if frreq id is not valid", async () => {
        const res = await request(global.__SERVER__)
            .post(`/api/friend/declineFrReq/invalid-id`);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid friendship requeste ID");
    });
});
