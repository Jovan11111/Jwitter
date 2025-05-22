const request = require("supertest")

describe("POST /api/auth/resetPassword/:token", () => {
    it("should reset password succefully", async () => {
        rstToken = "resettoken"
        const res = await request(global.__SERVER__)
            .post(`/api/auth/resetPassword/${rstToken}`)
            .send({
                newPassword: "newpass"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Password successfully reset");
    })

    it("should return 400 if token is not valid", async () => {
        rstToken = "nonvalidtoken"
        const res = await request(global.__SERVER__)
            .post(`/api/auth/resetPassword/${rstToken}`)
            .send({
                newPassword: "newpass"
            });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("message", "Invalid or expired token");
    })
})