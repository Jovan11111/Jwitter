const request = require("supertest")

describe("POST /api/email/sendEmail", () => {

    it("should send email succesully", async () => {
        const emailList = ["example@email.com", "example2@email.com"];
        const res = await request(global.__SERVER__)
            .post(`/api/email/sendEmail`)
            .send({
                to: emailList,
                title: "some title",
                content: "some content"
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Email sent");
    });
})
