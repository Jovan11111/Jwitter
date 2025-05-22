const request = require("supertest")

describe("POST /api/email/delpost", () => {

    it("should send email succesully", async () => {

        const res = await request(global.__SERVER__)
            .post(`/api/email/delpost`)
            .send({
                to: "example@email.com",
                title: "some title",
                pid: "somepid",
                uid: "someuid"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Deleted post email was sent");
    });
})
