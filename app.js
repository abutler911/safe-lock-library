const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const registerRoutes = require("./routes/register");

// Connect to the database
mongoose.connect(process.env.MONGO_DB_URI, {
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
app.use(expressLayouts);

// Set up the static files
app.use(express.static(path.join(__dirname, "public")));

// Set up the register routes
app.use(registerRoutes);

// Set up the root route
app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Safe Lock Library | 2023" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
