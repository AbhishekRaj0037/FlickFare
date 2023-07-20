const passport = require("passport");
const Seat = require("./models/seat");

module.exports.authenticate = passport.authenticate("local", {
  failureRedirect: "/login",
  failureMessage: true,
  failureFlash: true,
});

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.username != "admin") {
    return res.redirect("/home");
  }
  next();
};
