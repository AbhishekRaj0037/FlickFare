const User = require("../models/user");
const bcrypt = require("bcrypt");
const Show = require("../models/show");
const Booking = require("../models/booking");
const Seat = require("../models/seat");
const SeatLock = require("../models/seatLock");
const { cloudinary } = require("../config/cloudinary");
const seatLock = require("../models/seatLock");
const Review = require("../models/review");
const { userRegisterSchema, userLoginSchema } = require("../schemas");
const flash = require("connect-flash");
const { passwordSchema } = require("../schemas");

module.exports.renderRegisterForm = async (req, res) => {
  const errors = req.flash().error || [];
  return res.render("users/register", { errors });
};

module.exports.register = async (req, res, next) => {
  const result = userRegisterSchema.validate(req.body);
  if (result.error) {
    req.flash("error", result.error.details[0].message);
    return res.redirect("/register");
  }
  const alreadyUser = await User.findOne({ username: req.body.username });
  if (alreadyUser) return res.send("User already exsists!!!");
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, await bcrypt.genSalt(12)),
    email: req.body.email,
    balance: 0,
    image:
      "https://res.cloudinary.com/dagjmj2ww/image/upload/v1687974161/dummy-profile-pic_xuzzgf.jpg",
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/login");
};

module.exports.renderLoginForm = async (req, res) => {
  const errors = req.flash().error || [];
  return res.render("users/login", { errors });
};

module.exports.loggedIn = async (req, res) => {
  if (req.user.username == "admin") {
    return res.redirect("/admindashboard");
  }
  res.redirect("/home");
};

module.exports.logout = async (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);
    else res.redirect("/home");
  });
};

module.exports.renderProfile = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });

  return res.render("profile", { user });
};

module.exports.bookings = async (req, res) => {
  const booking = await Booking.find({ user: req.user.id });
  const user = await User.findById(req.user.id);
  return res.render("bookings", { booking, user });
};

module.exports.changePassword = async (req, res) => {
  const user = req.user;
  const errors = req.flash().error || [];
  return res.render("changePassword", { user, errors });
};

module.exports.updatePassword = async (req, res) => {
  const result = passwordSchema.validate(req.body);
  if (result.error) {
    req.flash("error", result.error.details[0].message);
    return res.redirect("/changepassword");
  }
  const password = bcrypt.hashSync(req.body.password, await bcrypt.genSalt(12));
  const user = await User.findById(req.user.id);
  user.password = password;
  user.save();
  return res.redirect("/profile");
};

module.exports.addCredit = async (req, res) => {
  let { amount } = req.body;
  amount = parseInt(amount);
  const user = await User.findOne({ _id: req.user.id });
  let currentBalance = user.balance;
  let newBalance = parseInt(currentBalance) + parseInt(amount);
  if (amount > 0) {
    user.balance = newBalance;
    user.save();
  }
  return res.render("profile", { user });
};

module.exports.admindashboard = async (req, res) => {
  const user = await User.find({});
  const show = await Show.find({});
  const booking = await Booking.find({});
  const totalUser = user.length;
  const totalShow = show.length;
  const totalBooking = booking.length;
  return res.render("admin/dashboard", { totalUser, totalShow, totalBooking });
};

module.exports.adminshows = async (req, res) => {
  const show = await Show.find({});
  return res.render("admin/shows", { show });
};

module.exports.adminaddshows = async (req, res) => {
  const errors = req.flash().errors || [];
  return res.render("admin/addShow", { errors });
};

module.exports.adminusers = async (req, res) => {
  const user = await User.find({});
  return res.render("admin/users", { user });
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  let user = await User.findById(id);
  await Review.collection
    .find({ author: user._id })
    .forEach(async function (doc) {
      await Show.updateOne(
        { _id: doc.show },
        {
          $pullAll: {
            reviews: [doc._id],
          },
        }
      );
    });
  await Booking.deleteMany({ user: id });
  await User.findByIdAndDelete(id);
  await Review.deleteMany({ author: id });
  user = await User.find({});
  return res.render("admin/users", { user });
};

module.exports.adminbooking = async (req, res) => {
  const booking = await Booking.find({}).populate("user");
  return res.render("admin/booking", { booking });
};

module.exports.deleteBooking = async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);
  for (const currentSeat of booking.seatNo) {
    const seat = await Seat.findById(currentSeat);
    seat.user = null;
    seat.occupied = false;
    seat.lastBooked = Date.now();
    await seat.save();
    const seatLock = await SeatLock.find({
      seatNo: seat.seatNo,
      show: booking.show,
      date: booking.date,
    });
    seatLock[0].user = null;
    seatLock[0].occupied = false;
    seatLock[0].lastBooked = Date.now();
    await seatLock[0].save();
  }
  const user = await User.findById(booking.user);
  const username = user.username;
  let totalSeats = booking.seatNo.length;
  user.balance += Number(totalSeats) * 100;
  await user.save();
  booking = await Booking.findByIdAndDelete(req.params.id);
  booking = await Booking.find({});
  return res.redirect("/adminbooking");
};

module.exports.profileimage = async (req, res) => {
  if (req.file == undefined) {
    return res.redirect("/profile");
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  const user = await User.findById(req.user);
  user.image = result.url;
  user.save();
  return res.render("profile", { user });
};

module.exports.validateUser = async (req, res, next) => {
  const result = userLoginSchema.validate(req.body);
  if (result.error) {
    req.flash("error", result.error.details[0].message);
    return res.redirect("/login");
  }
  next();
};
