const request = require("supertest")

describe("POST /api/email/delacc", () => {

    it("should send email succesully", async () => {

        const res = await request(global.__SERVER__)
            .post(`/api/email/delacc`)
            .send({
                to: "example@email.com",
                username: "someusername"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Deleted account email was sent");
    });
})
