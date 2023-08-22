const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
require("./config/passport-config")(passport);
require("dotenv").config();
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const adminRoutes = require("./routes/admin");
const repositoryRoutes = require("./routes/repository");
const uploadRoutes = require("./routes/upload");

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
app.use(express.urlencoded({ extended: true }));

// Set up the static files
app.use(express.static(path.join(__dirname, "public")));

// Configure session
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Configure flash
app.use(flash());

// Middleware to make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Set up the register routes
app.use(registerRoutes);
app.use(loginRoutes);
app.use(adminRoutes);
app.use(repositoryRoutes);
app.use(uploadRoutes);

// Set up the root route
app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Safe Lock Library | 2023" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
