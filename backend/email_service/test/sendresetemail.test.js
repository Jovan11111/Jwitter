const request = require("supertest")

describe("POST /api/email/reset", () => {

    it("should send email succesully", async () => {

        const res = await request(global.__SERVER__)
            .post(`/api/email/reset`)
            .send({
                to: "example@email.com",
                token: "some token"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Reset email sent");
    });
})
