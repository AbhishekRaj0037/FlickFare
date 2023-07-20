const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authenticateUser = async (username, password, callback) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user)
        return callback(null, false, {
          message: "Incorrect username or password.",
        });
      if (bcrypt.compareSync(password, user.password))
        return callback(null, user);
      else
        return callback(null, false, {
          message: "Incorrect username or password.",
        });
    })
    .catch((error) => {
      callback(error);
    });
};

const authenticationStrategy = new LocalStrategy(authenticateUser);
passport.use(authenticationStrategy);

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((userId, callback) => {
  User.findById(userId)
    .then((user) => {
      callback(null, user);
    })
    .catch((error) => callback(error));
});
