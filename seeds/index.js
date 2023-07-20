const Show = require("../models/show");

module.exports.addSeats = async (id, inDate) => {
  const show = await Show.findById(id);
  var start = inDate;
  for (let i = 1; i <= 7; i += 1) {
    const month = start.getMonth();
    const year = start.getFullYear();
    const day = start.getDate();
    const date = new Date(parseInt(year), parseInt(month), parseInt(day));
    let Seat = require("../models/seat");
    let newSeat = new Seat({
      seatNo: "1A",
      show: show._id,
      date: date,
      occupied: false,
      user: null,
      lastBooked: null,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "2A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "3A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "4A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "5A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "6A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "7A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "8A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "9A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    Seat = require("../models/seatLock");
    newSeat = new Seat({
      seatNo: "1A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "1F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "2A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "2F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "3A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "3F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "4A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "4F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "5A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "5F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "6A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "6F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "7A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "7F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "8A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "8F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();

    newSeat = new Seat({
      seatNo: "9A",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9B",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9C",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9D",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,

      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9E",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    newSeat = new Seat({
      seatNo: "9F",
      show: show._id,
      date: date,
      user: null,
      lastBooked: null,
      occupied: false,
    });
    await newSeat.save();
    start.setDate(start.getDate() + 1);
  }
};
