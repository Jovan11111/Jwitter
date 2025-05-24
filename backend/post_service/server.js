const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "test") {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {console.log("Connected to the database");})
        .catch(err => {console.log("Failed to connect to database: ", err);});
}

const postRoutes = require('./routes/postRoutes');
app.use('/api/post', postRoutes);

module.exports = app

if (process.env.NODE_ENV !== "test"){
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

