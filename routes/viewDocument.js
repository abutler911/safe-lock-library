const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { ensureAuthenticated } = require("../middleware/auth");
const Document = require("../models/Document");
const path = require("path");
const logger = require("../logs/logger");
const { decrypt } = require("../middleware/encryption");
const fs = require("fs");

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
    const encryptedData = fs.readFileSync(
      path.resolve(__dirname, "..", document.path)
    );
    const decryptedData = decrypt(encryptedData);

    res.writeHead(200, {
      "Content-Type": document.type,
      "Content-Disposition": "attachment; filename=" + document.name,
      "Content-Length": decryptedData.length,
    });
    res.end(decryptedData);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching the document");
  }
});

module.exports = router;
