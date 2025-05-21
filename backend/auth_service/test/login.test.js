const request = require("supertest");


describe("POST /api/auth/login", () => {

  it("should login with correct credentials", async () => {
    const res = await request(global.__SERVER__)
      .post("/api/auth/login")
      .send({
        username: "testuser",
        password: "testpassword"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.message).toBe("Login successful");
  });

  it("should return 404 for non-existent user", async () => {
    const res = await request(global.__SERVER__)
      .post("/api/auth/login")
      .send({
        username: "nonexistent",
        password: "whatever"
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("User not found");
  });

  it("should return 400 for wrong password", async () => {
    const res = await request(global.__SERVER__)
      .post("/api/auth/login")
      .send({
        username: "testuser",
        password: "wrongpassword"
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("Wrong password");
  });
});
