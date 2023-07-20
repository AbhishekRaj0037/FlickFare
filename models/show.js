const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema({
  title: String,
  image: String,
  cover: String,
  description: String,
  genre: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  inDate: Date,
  certificate: String,
  language: String,
  duration: String,
  director: String,
  cast: String,
});

module.exports = mongoose.model("Show", showSchema);
