const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const morgan = require("morgan");
const logger = require("../logs/logger");

module.exports = (app) => {
  // Morgan configuration
  morgan.format(
    "winston",
    ":method :url :status :res[content-length] - :response-time ms"
  );
  app.use(
    morgan("winston", {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );

  // Session configuration
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
    })
  );

  // Passport initialization
  app.use(passport.initialize());
  app.use(passport.session());

  // Flash configuration
  app.use(flash());

  // Middleware to make flash messages available in all views
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
  });
};
