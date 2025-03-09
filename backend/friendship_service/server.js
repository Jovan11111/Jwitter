const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


dotenv.config();

const app = express();

app.use(cors());  
app.use(bodyParser.json()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to a database");
  })
  .catch(err => {
    console.log("Failed to connect to DB", err);
    
  });

const friendshipRoutes = require("./routes/friendshipRoutes")
app.use('/api/friend/', friendshipRoutes)

const port = process.env.PORT || 5002
app.listen(5002, () => {
  console.log(`Server is running on http://localhost:${port}`);
});