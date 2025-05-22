const request = require("supertest")

describe("POST /api/auth/reportUser/:id", () => {
    it("should succesfully report a user", async () => {
        userId = global.__USER_ID__;
        const res = await request(global.__SERVER__)
            .post(`/api/auth/reportUser/${userId}`)
            .send({
                scoree: 7
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Reported user");
    });

    it("should return 404 if user doesn't exist", async () => {
        userId = "609e1254f1b3f51d88e9c8b9";
        const res = await request(global.__SERVER__)
            .post(`/api/auth/reportUser/${userId}`)
            .send({
                scoree: 7
            });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty("error", "User not found");
    });

    it("should return 400 if userID is not valid", async () => {
        userId = "1";
        const res = await request(global.__SERVER__)
            .post(`/api/auth/reportUser/${userId}`)
            .send({
                scoree: 7
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("error", "Invalid user ID");
    });

    it("should return 400 if score is not valid", async () => {
        userId = global.__USER_ID__;
        const res = await request(global.__SERVER__)
            .post(`/api/auth/reportUser/${userId}`)
            .send({
                scoree: "string"
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("error", "Invalid score");
    });

    it("should return 400 if score is less then 0", async() =>  {
        userId = global.__USER_ID__;
        const res = await request(global.__SERVER__)
            .post(`/api/auth/reportUser/${userId}`)
            .send({
                scoree: -10
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("error", "Invalid score");
    });
})