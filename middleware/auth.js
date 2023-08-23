function attachAuthStatus(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
}

const checkAdminStatus = (req, res, next) => {
  // Assuming the user object is attached to req, and it has an isAdmin property
  // You'll need to modify this to match your actual user object structure
  res.locals.isAdmin = req.user && req.user.isAdmin;
  next();
};

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
  checkAdminStatus,
};
