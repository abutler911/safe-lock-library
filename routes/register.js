const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register.ejs", { title: "Register | Safe Lock Library" });
});

module.exports = router;
