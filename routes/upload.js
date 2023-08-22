const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const Document = require("../models/Document");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
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

      // Get file details
      const documentDetails = {
        user: req.user._id,
        name: req.file.originalname,
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
