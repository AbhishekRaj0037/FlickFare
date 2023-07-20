const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  seatNo: String,
  show: {
    type: Schema.Types.ObjectId,
    ref: "Show",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  lastBooked: Date,
  date: Date,
  occupied: Boolean,
});

module.exports = mongoose.model("Seat", seatSchema);
