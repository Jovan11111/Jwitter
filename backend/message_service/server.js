const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser =require("body-parser");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to a database");
    })
    .catch(err => {
        console.log("Failed to connect to database", err);
    })

const messageRoutes = require("./routes/messageRoutes")
app.use('/api/message', messageRoutes)

const port = process.env.PORT || 5003
app.listen(5003, () => {
    console.log(`Listening on port ${port}`);
})