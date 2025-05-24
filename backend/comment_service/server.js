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
        .then(() => {console.log('Connected to a database');})
        .catch(err => {console.log('Failed to connect to the database');});
}
 

const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comment', commentRoutes);

module.exports = app;

if (process.env.NODE_ENV !== "test"){
    const port = process.env.PORT || 5004; 
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}
