const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserModel');
const { validPassword } = require('../lib/passportUtilities');

// this is a passport.js function that verifies whether the user exists
// and whether the encrypted password is correct
const verifyCallback = (username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isValid = validPassword(password, user.hash, user.salt);

    if (isValid) {
      return done(null, user);
    }
    return done(null, false, { message: 'Incorrect password.' });
  });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});