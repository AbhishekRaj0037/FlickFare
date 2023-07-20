const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  show: {
    type: Schema.Types.ObjectId,
    ref: "Show",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
