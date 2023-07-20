const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  seatNo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Seat",
    },
  ],
  seat: { type: String },

  show: {
    type: Schema.Types.ObjectId,
    ref: "Show",
  },
  showName: { type: String },
  date: Date,
  invoice: {
    type: String,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
