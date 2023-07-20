const Review = require("../models/review");
const Show = require("../models/show");
const util = require("util");
module.exports.createReview = async (req, res) => {
  const show = await Show.findById(req.params.id);
  const review = new Review({
    body: req.body.review.body,
    rating: req.body.review.rating,
    author: req.user._id,
    show: req.params.id,
  });
  await review.save();
  show.reviews.push(review);
  await show.save();
  return res.redirect(`/show/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { reviewId, id } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    return res.redirect(`/show/${id}`);
  }
  if (!review.author.equals(req.user._id)) {
    return res.redirect(`/show/${id}`);
  }
  await Review.findByIdAndDelete(reviewId);
  return res.redirect(`/show/${id}`);
};
