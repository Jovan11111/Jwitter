const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const hashedPassword = await bcrypt.hash("testpassword", 10);

  await User.create({
    username: "testuser",
    email: "testuser@example.com",
    password: hashedPassword
  });

  server = app.listen(4000);
  global.__SERVER__ = server;
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  server.close();
});
