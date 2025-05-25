const mongoose = require("mongoose");
const app = require("../server");
const Friendship = require("../models/Friendship")
const FriendshipRequest = require("../models/FriendshipRequest")

let server;
let frships = {};
let frreqs = {};

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const userid1 = new mongoose.Types.ObjectId();
    const userid2 = new mongoose.Types.ObjectId();
    const userid3 = new mongoose.Types.ObjectId();
    const userid4 = new mongoose.Types.ObjectId();
    const userid5 = new mongoose.Types.ObjectId();
    const userid6 = new mongoose.Types.ObjectId();

    // Accept frreq
    frreqs.frReqToBeAccepted = await FriendshipRequest.create({
        sender: userid1,
        receiver: userid2
    });

    // Are they friends
    frships.frshipExists = await Friendship.create({
        user1: userid1,
        user2: userid3
    });

    frreqs.frreqExists = await FriendshipRequest.create({
        sender: userid1,
        receiver: userid4
    });

    // Decline frreq 
    frreqs.frReqToBeDeclined = await FriendshipRequest.create({
        sender: userid2,
        receiver: userid3
    });

    // Delete user frreqs and frships
    frreqs.frreq1 = await FriendshipRequest.create({
        sender: userid1,
        receiver: userid5
    });
    
    frreqs.frreq2 = await FriendshipRequest.create({
        sender: userid5,
        receiver: userid3
    });

    frreqs.frreq3 = await FriendshipRequest.create({
        sender: userid5,
        receiver: userid4
    });

    frships.frship1 = await Friendship.create({
        user1: userid2,
        user2: userid5
    });

    frships.frship2 = await Friendship.create({
        user1: userid5,
        user2: userid6
    });

    // Remove friend
    frships.frshipToBeDeleted = await Friendship.create({
        user1: userid2,
        user2: userid6
    });

    global.frreqs = frreqs;
    global.frships = frships;
    server = app.listen(4002);
    global.__SERVER__ = server;
})

afterAll(async () => {
    await Friendship.deleteMany({});
    await FriendshipRequest.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
})