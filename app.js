// Load environment variables
require("dotenv").config();

// Import core dependencies
const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { attachAuthStatus, checkAdminStatus } = require("./middleware/auth");
const methodOverride = require("method-override");

//AWS Config
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

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
const logoutRoute = require("./routes/logout");

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
app.use(attachAuthStatus);
app.use(checkAdminStatus);
app.use(methodOverride("_method"));

// Apply routes
app.use(registerRoutes);
app.use(loginRoutes);
app.use(adminRoutes);
app.use(repositoryRoutes);
app.use(uploadRoutes);
app.use(viewDocumentRoute);
app.use(logoutRoute);

// Define root route
app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Safe Lock Library | 2023" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);

  res.status(err.status || 500).render("error", {
    message: err.message || "An unexpected error occurred!",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
