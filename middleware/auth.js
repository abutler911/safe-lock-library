function attachAuthStatus(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "Please log in to view this resource");
    res.redirect("/login");
  }
}

module.exports = {
  ensureAuthenticated,
  attachAuthStatus,
};
