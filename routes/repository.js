const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { ensureAuthenticated } = require("../middleware/auth");
const Document = require("../models/Document");

// Your existing GET route
router.get("/repository", ensureAuthenticated, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id });
    console.log("Logged-in user:", req.user.username);

    console.log("Fetched documents: ", documents);
    res.render("repository", {
      documents,
      success_msg: req.flash("success-message"),
      isAdmin: req.user.isAdmin,
      title: "Repository | Safe Lock Library",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching the documents.");
  }
});

module.exports = router;
