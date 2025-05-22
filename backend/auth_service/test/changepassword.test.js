const request = require("supertest");

describe("POST /api/auth/changePassword", () => {

    it("should change password succesfully", async () => {
        const userId = global.__USER_ID__;
        const res = await request(global.__SERVER__)
            .post(`/api/auth/changePassword`)
            .send({
                userId: userId,
                newPass: "newpass"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Changed password succesfully");
    });

    it("should return 400 for invalid user ID", async () => {
        const userId = "1";
        const res = await request(global.__SERVER__)
            .post(`/api/auth/changePassword`)
            .send({
                userId: userId,
                newPass: "newpass"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error", "Invalid user ID")
    });

    it("should return 404 if user doesn't exist", async () => {
        const userId = "609e1254f1b3f51d88e9c8b9";
        const res = await request(global.__SERVER__)
            .post(`/api/auth/changePassword`)
            .send({
                userId: userId,
                newPass: "newpass"
            });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("error", "User not found");
    });
})