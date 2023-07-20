const Show = require("../models/show");
const Review = require("../models/review");
const Booking = require("../models/booking");
const Seat = require("../models/seat");
const SeatLock = require("../models/seatLock");
const { cloudinary } = require("../config/cloudinary");
const { adminAddShowSchema } = require("../schemas");
const Index = require("../seeds/index");
const flash = require("connect-flash");

module.exports.index = async (req, res, next) => {
  const show = await Show.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "author",
    },
  });
  if (!show) {
    return res.redirect("/home");
  }
  return res.render("show", { show });
};

module.exports.deleteShow = async (req, res, next) => {
  let show = await Show.findById(req.params.id);
  for (let currentReview of show.reviews) {
    await Review.findByIdAndDelete(currentReview);
  }
  await Booking.deleteMany({ show: req.params.id });
  await Seat.deleteMany({ show: req.params.id });
  await SeatLock.deleteMany({ show: req.params.id });
  show = await Show.findByIdAndDelete(req.params.id);
  show = await Show.find({});
  return res.render("admin/shows", { show });
};

module.exports.createShow = async (req, res, next) => {
  if (req.file == undefined) {
    req.flash("errors", "Please upload poster");
    return res.redirect("/adminaddshows");
  }
  const schemaResult = adminAddShowSchema.validate(req.body);
  if (schemaResult.error) {
    req.flash("errors", schemaResult.error.details[0].message);
    return res.redirect("/adminaddshows");
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  const {
    title,
    description,
    genre,
    inDate,
    certificate,
    language,
    duration,
    director,
    cast,
  } = req.body;
  let month = inDate[5];
  month += inDate[6];
  let year = inDate[0];
  year += inDate[1];
  year += inDate[2];
  year += inDate[3];
  let day = inDate[8];
  day += inDate[9];
  const intime = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day) + 1
  );
  let show = await Show.create({
    title: title,
    description: description,
    image: result.url,
    inDate: intime,
    certificate: certificate,
    language: language,
    duration: duration,
    director: director,
    cast: cast,
  });
  show.genre.push(genre);
  await show.save();
  await Index.addSeats(show._id, intime);
  show = await Show.find({});
  return res.render("admin/shows", { show });
};
