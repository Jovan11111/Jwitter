const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");

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
app.use('/api/message', messageRoutes);

// Set up the server to listen on the specified port
const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
