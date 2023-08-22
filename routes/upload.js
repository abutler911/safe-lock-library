const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const Document = require("../models/Document");
const multer = require("multer");
const sanitize = require("sanitize-filename");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Use the sanitized filename
    const filename = sanitize(req.body.filename || file.originalname);
    cb(null, Date.now() + "-" + filename);
  },
});
const upload = multer({ storage });

router.post(
  "/upload",
  ensureAuthenticated,
  upload.single("document"),
  async (req, res) => {
    try {
      const userId = req.user._id;
      // Sanitize the filename
      const filename = sanitize(req.body.filename || req.file.originalname);

      // Get file details
      const documentDetails = {
        user: req.user._id,
        name: filename, // Use sanitized filename
        path: req.file.path,
        type: req.file.mimetype,
        size: req.file.size,
      };

      // Create and save the document
      const document = new Document(documentDetails);
      await document.save();

      // Redirect or send a response
      req.flash("success_msg", "Document uploaded successfully!");
      res.redirect("/repository");
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while uploading the document.");
    }
  }
);

module.exports = router;
