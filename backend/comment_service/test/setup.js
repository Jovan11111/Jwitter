const mongoose = require("mongoose");
const app = require("../server");
const Comment = require("../models/Comment")

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server = app.listen(4004);
  global.__SERVER__ = server;
})

afterAll(async () => {
    await Comment.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
})