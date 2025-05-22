const app = require("../server")

let server;

beforeAll(async () => {
    server = app.listen(4005);
    global.__SERVER__ = server;
})

afterAll(async () => {
    server.close();
})