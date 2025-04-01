const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const socketIo = require('socket.io')

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.log("Failed to connect to the database", err);
  });

// Import routes
const messageRoutes = require("./routes/messageRoutes");
const Message = require("./models/Message");
app.use('/api/message', messageRoutes);

const server = require('http').createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST", "DELETE"]
  }
});

io.on('connection', (socket) => {
  console.log('A user is connected');
  socket.on('sendMessage', async (msgData) => {
    const { sender, receiver, content } = msgData;
    const newMsg = new Message({sender, receiver, content});
    await newMsg.save();

    io.emit('newMsg', newMsg);
  });

  socket.on('disconnect', () => {
    console.log('User is disconnected');
  });
});

// Set up the server to listen on the specified port
const port = process.env.PORT || 5003;

server.listen(port, () =>{
  console.log(`Server is listening on port ${port}`);
})
