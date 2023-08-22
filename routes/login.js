const express = require("express");
const passport = require("passport");

const router = express.Router();
const User = require("../models/User.js");

// Your existing GET route
router.get("/login", (req, res) => {
  res.render("login", { title: "Login | Safe Lock Library" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/repository",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
