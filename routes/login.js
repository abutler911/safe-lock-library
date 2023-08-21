const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

// Your existing GET route
router.get("/login", (req, res) => {
  res.render("login", { title: "Login | Safe Lock Library" });
});

module.exports = router;
