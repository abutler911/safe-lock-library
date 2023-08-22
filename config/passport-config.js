const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username })
        .then((user) => {
          if (!user)
            return done(null, false, { message: "Incorrect username." });

          // Compare the password with the hashed password in the database
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) return done(null, user);
            else return done(null, false, { message: "Incorrect password." });
          });
        })
        .catch((err) => done(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};
