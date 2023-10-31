const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

//database connection
mongoose
  .connect(
    "mongodb+srv://cgarg2461:SVrrrLhk4CxGEaOG@cluster0.3wswoxd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/authRoutes"));

const port = 8000;

app.listen(port, () => console.log(`Server is running on ${port}`));
