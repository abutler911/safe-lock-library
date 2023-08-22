// Load environment variables
require("dotenv").config();

// Import core dependencies
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// Database connection
require("./config/db");

// Import Passport configuration
const passport = require("passport");
require("./config/passport-config")(passport);

// Import routes
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const adminRoutes = require("./routes/admin");
const viewDocumentRoute = require("./routes/viewDocument");
const repositoryRoutes = require("./routes/repository");
const uploadRoutes = require("./routes/upload");

// Create Express app
const app = express();

// Configure view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Apply middleware configurations
require("./middleware/middleware")(app);

// Apply routes
app.use(registerRoutes);
app.use(loginRoutes);
app.use(adminRoutes);
app.use(repositoryRoutes);
app.use(uploadRoutes);
app.use(viewDocumentRoute);

// Define root route
app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Safe Lock Library | 2023" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
