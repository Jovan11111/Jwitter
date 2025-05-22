const request = require("supertest")

describe("POST /api/email/acceptapp", () => {

    it("should send email succesully", async () => {

        const res = await request(global.__SERVER__)
            .post(`/api/email/acceptapp`)
            .send({
                to: "example@email.com",
                title: "some title"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Accept Appeal email sent");
    });
})
