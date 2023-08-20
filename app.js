const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// Connect to the database
mongoose.connect("mongodb://localhost/secure-docs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to the database!");
});

// Set up the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up the static files
app.use(express.static(path.join(__dirname, "public")));

// Set up the routes
app.use("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
