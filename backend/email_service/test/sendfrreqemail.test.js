const request = require("supertest")

describe("POST /api/email/frreq", () => {

    it("should send email succesully", async () => {

        const res = await request(global.__SERVER__)
            .post(`/api/email/frreq`)
            .send({
                to: "example@email.com"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "New Freind request email sent");
    });
})
