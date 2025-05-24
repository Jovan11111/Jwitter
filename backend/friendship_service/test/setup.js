const mongoose = require("mongoose");
const app = require("../server");
const Friendship = require("../models/Friendship")

let server;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    server = app.listen(4002);
    global.__SERVER__ = server;
})

afterAll(async () => {
    await Friendship.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
})