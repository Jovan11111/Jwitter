const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require("./routes/emailRoutes");
app.use("/api/email", authRoutes);

const port = process.env.PORT || 5005;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
