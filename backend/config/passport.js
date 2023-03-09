const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserModel");
const { validPassword } = require("../lib/passportUtilities");

// this is a passport.js function that verifies whether the user exists
// and whether the encrypted password is correct
const verifyCallback = (username, password, done) => {
  // find the user in the database
  User.findOne({ username })
    .then((user) => {
      // if the user doesn't exist, return false
      if (!user) {
        return done(null, false);
      }
      // if the user exists, check if the password is correct
      const isValid = validPassword(password, user.hash, user.salt);
      if (isValid) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById({ _id: id })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
