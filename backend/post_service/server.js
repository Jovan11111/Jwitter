const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.log("Failed to connect to database: ", err);
    });

// Routes
const postRoutes = require('./routes/postRoutes');
app.use('/api/post', postRoutes);

// Start server
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
