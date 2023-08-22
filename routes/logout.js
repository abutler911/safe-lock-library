// routes/logout.js
const express = require("express");
const { ensureAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.get("/logout", ensureAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login?logged_out=true");
  });
});

module.exports = router;
