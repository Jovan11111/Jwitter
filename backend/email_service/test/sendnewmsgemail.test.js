const request = require("supertest")

describe("POST /api/email/msg", () => {

    it("should send email succesully", async () => {

        const res = await request(global.__SERVER__)
            .post(`/api/email/msg`)
            .send({
                to: "example@email.com",
                sender: "examplee@email.com",
                content: "some content"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "New message email sent");
    });
})
