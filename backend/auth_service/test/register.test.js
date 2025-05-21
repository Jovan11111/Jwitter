const request = require("supertest");

describe("POST /api/auth/register", () => {

 it("should register succesfully", async() => {
    const res = await request(global.__SERVER__)
        .post("/api/auth/register")
        .send({
            username: "newuser",
            password: "password",
            email: "email"
        });

        expect(res.statusCode).toEqual(201)
        expect(res.body.message).toBe("Registered succesfully")
 });
 
 it("should return 400 for user already exists", async() => {
    const res = await request(global.__SERVER__)
        .post("/api/auth/register")
        .send({
            username: "testuser",
            password: "password"
        })

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe("User already exists");
 })
});
