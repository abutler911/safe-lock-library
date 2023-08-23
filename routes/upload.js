const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const Document = require("../models/Document");
const multer = require("multer");
const sanitize = require("sanitize-filename");
const { encrypt, decrypt } = require("../middleware/encryption");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
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
      const filename = sanitize(req.body.filename || req.file.originalname);

      const fileBuffer = fs.readFileSync(req.file.path);
      const encryptedData = encrypt(fileBuffer);

      const encryptedPath = req.file.path + ".enc";
      fs.writeFileSync(encryptedPath, encryptedData);

      const documentDetails = {
        user: req.user._id,
        name: filename,
        path: encryptedPath,
        type: req.file.mimetype,
        size: encryptedData.length,
      };

      const document = new Document(documentDetails);
      await document.save();

      fs.unlinkSync(req.file.path);

      req.flash("success_msg", "Document uploaded successfully!");
      res.redirect("/repository");
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while uploading the document.");
    }
  }
);

module.exports = router;
