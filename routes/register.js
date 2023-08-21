const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.get("/register", (req, res) => {
  res.render("register.ejs", { title: "Register | Safe Lock Library" });
});

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const user = new User({ firstname, lastname, email, username, password });

    await user.save();

    req.flash(
      "success_msg",
      "You have successfully registered! Please log in."
    );

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
