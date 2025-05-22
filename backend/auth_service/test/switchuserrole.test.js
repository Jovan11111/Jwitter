const request = require("supertest");

describe("POST /api/auth/switchUserRole", () => {
    it("should succesully switch user role", async () => {
        const userId = global.__USER_ID__;
        const res = await request(global.__SERVER__)
            .post(`/api/auth/switchUserRole`)
            .send({
                userId: userId,
                userRole: "admin"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Switched user role");
    });

    it("should return 400 for invalid user ID", async () => {
        const userId = "1"
        const res = await request(global.__SERVER__)
            .post(`/api/auth/switchUserRole`)
            .send({
                userId: userId,
                userRole: "admin"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error", "Invalid user ID")
    });

    it("should return 404 if user doesn't exist", async () => {
        const userId = "609e1254f1b3f51d88e9c8b9";
        const res = await request(global.__SERVER__)
            .post(`/api/auth/switchUserRole`)
            .send({
                userId: userId,
                userRole: "admin"
            });
        
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("error", "User not found")
    });

    it("should return 400 for invalid user role", async () => {
        const userId = global.__USER_ID__;
        const res = await request(global.__SERVER__)
            .post(`/api/auth/switchUserRole`)
            .send({
                userId: userId,
                userRole: "admln"
            });
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error", "Invalid user role")
    });
})