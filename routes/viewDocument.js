const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { ensureAuthenticated } = require("../middleware/auth");
const Document = require("../models/Document");
const path = require("path");
const logger = require("../logs/logger");

router.get("/view/:documentId", ensureAuthenticated, async (req, res) => {
  logger.info(
    `${req.user.username} accessing and viewing document ${req.params.documentId}`
  );
  try {
    const document = await Document.findById(req.params.documentId);

    if (!document) {
      return res.status(404).send("Document not found");
    }

    // Check if the user is the owner of the document or has admin privileges
    if (String(document.user) !== String(req.user._id) && !req.user.isAdmin) {
      return res
        .status(403)
        .send("You do not have permission to view this document");
    }

    // Send the file
    res.sendFile(path.resolve(__dirname, "..", document.path));
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching the document");
  }
});

module.exports = router;
