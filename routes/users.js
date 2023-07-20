const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const middleware = require("../middleware");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const passport = require("passport");
const upload = require("../utils/multer");
const { isLoggedIn, isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(urlencodedParser, catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLoginForm)
  .post(users.validateUser, middleware.authenticate, users.loggedIn);

router.get("/logout", users.logout);

router.get("/profile", isLoggedIn, catchAsync(users.renderProfile));
router.get("/bookings", isLoggedIn, catchAsync(users.bookings));
router.get("/changepassword", isLoggedIn, catchAsync(users.changePassword));
router.post("/changepassword", isLoggedIn, catchAsync(users.updatePassword));

router.post("/addcredit", isLoggedIn, catchAsync(users.addCredit));

router.get(
  "/admindashboard",
  isLoggedIn,
  isAdmin,
  catchAsync(users.admindashboard)
);

router.get("/adminshows", isLoggedIn, isAdmin, catchAsync(users.adminshows));

router.get("/adminaddshows", isLoggedIn, isAdmin, users.adminaddshows);

router.get("/adminusers", isLoggedIn, isAdmin, catchAsync(users.adminusers));

router.get("/delete/:id", isLoggedIn, isAdmin, catchAsync(users.deleteUser));

router.get(
  "/adminbooking",
  isLoggedIn,
  isAdmin,
  catchAsync(users.adminbooking)
);

router.get("/booking/delete/:id", isLoggedIn, catchAsync(users.deleteBooking));

router.post(
  "/profileimage",
  isLoggedIn,
  upload.single("profilePicture"),
  catchAsync(users.profileimage)
);

module.exports = router;
