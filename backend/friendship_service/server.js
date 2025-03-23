const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection failed:", err));

// Routes
const friendshipRoutes = require("./routes/friendshipRoutes");
app.use("/api/friend", friendshipRoutes);

// Server Setup
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
