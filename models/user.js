const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
