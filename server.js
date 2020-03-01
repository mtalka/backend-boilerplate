require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

app.listen(9001, () => {
    console.log("Server has started");
});
