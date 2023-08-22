const express = require("express");
const router = express.Router();

router.get("/admin", (req, res) => {
  // add authentication middleware here to restrict access

  res.render("admin/dashboard", { title: "Admin Dashboard" });
});

module.exports = router;
