const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { ensureAuthenticated } = require("../middleware/auth");
const Document = require("../models/Document");
const fs = require("fs");

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

router.delete("/delete/:id", ensureAuthenticated, async (req, res) => {
  try {
    // Find the document by ID
    const document = await Document.findById(req.params.id);

    // Check if the user is authorized to delete the document
    if (document.user.toString() !== req.user._id.toString()) {
      req.flash("error_msg", "Not authorized to delete this document.");
      return res.redirect("/repository");
    }

    // Delete the file from the file system
    fs.unlinkSync(document.path);

    // Delete the document from the database
    await document.remove();

    // Redirect with a success message
    req.flash("success_msg", "Document deleted successfully!");
    res.redirect("/repository");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting the document.");
  }
});

module.exports = router;
