const request = require("supertest")

describe("GET /api/auth/user/:id", () => {
    it("should return an existing user", async () => {
        
        const userId = global.__USER_ID__

        const res = await request(global.__SERVER__)
            .get(`/api/auth/user/${userId}`)

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("username", "testuser")
        expect(res.body).toHaveProperty("email", "testuser@example.com")
    });

    it("should return error 404 if user doesn't exist", async () => {
        const userId = "609e1254f1b3f51d88e9c8b9"
        
        const res = await request(global.__SERVER__)
            .get(`/api/auth/user/${userId}`)
        
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe("User not found");
    });

    if("should return 400 if id is not valid", async() => {
        const userId = "1"

        const res = await request(global.__SERVER__)
            .get(`/api/auth/user/${userId}`)
        
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe("Invalid user ID");
    });
})