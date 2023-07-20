const express = require("express");
const router = express.Router();
const reviews = require("../controllers/reviews");
const util = require("util");
const { isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.post("/:id/reviews", isLoggedIn, catchAsync(reviews.createReview));

router.delete(
  "/:id/reviews/:reviewId",
  isLoggedIn,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
