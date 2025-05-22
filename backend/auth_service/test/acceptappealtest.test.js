const request = require("supertest")

describe("GET /api/auth/acceptAppeal/:id", () => {

    it("should accept appeal", async () => {
        userId = global.__USER_ID__;
        const res = await request(global.__SERVER__)
            .get(`/api/auth/acceptAppeal/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "User cleared of the blocked post");
    });

    it("should return 404 for non existant user", async () => {
        userId = "609e1254f1b3f51d88e9c8b9";
        const res = await request(global.__SERVER__)
            .get(`/api/auth/acceptAppeal/${userId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("error", "User not found");

    });

    it("should return 400 for invalid userID", async () => {
        userId = "1";
        const res = await request(global.__SERVER__)
            .get(`/api/auth/acceptAppeal/${userId}`);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error", "Invalid user ID");

    });
})