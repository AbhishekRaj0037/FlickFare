const express = require("express");
const router = express.Router();
const seats = require("../controllers/seats");
const { isLoggedIn, isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.post("/show/:id/seats", isLoggedIn, seats.bookSeat);

router.get(
  "/show/:id/seats/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})",
  isLoggedIn,
  catchAsync(seats.arrangement)
);

router.post(
  "/show/:id/seats/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})",
  isLoggedIn,
  catchAsync(seats.booked)
);

router.get(
  "/show/:id/seats/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})/payment/:seats",
  isLoggedIn,
  catchAsync(seats.payment)
);

router.get(
  "/show/:id/seats/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})/payment/:seats/invoice",
  isLoggedIn,
  catchAsync(seats.paid)
);

module.exports = router;
