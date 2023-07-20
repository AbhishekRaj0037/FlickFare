const Seats = require("../models/seat");
const SeatLock = require("../models/seatLock");
const Show = require("../models/show");
const easyinvoice = require("easyinvoice");
const fs = require("fs");
const User = require("../models/user");
const Booking = require("../models/booking");
const { cloudinary } = require("../config/cloudinary");

module.exports.bookSeat = async (req, res) => {
  const id = req.params.id;
  const date = req.body.date;
  const show = await Show.findById(id);
  if (!show) {
    return res.redirect(`/show/${id}`);
  }
  const inDate = show.inDate;
  let month = show.inDate.getMonth();
  let year = show.inDate.getFullYear();
  let day = show.inDate.getDate();
  let outDate = new Date(parseInt(year), parseInt(month), parseInt(day));
  outDate.setDate(outDate.getDate() + 6);
  day = date[8];
  day += date[9];
  month = date[5];
  month += date[6];
  year = date[0];
  year += date[1];
  year += date[2];
  year += date[3];
  const selectedDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day) + 1
  );
  if (
    selectedDate > outDate ||
    selectedDate < inDate ||
    selectedDate < Date.now()
  ) {
    return res.redirect(`/show/${id}`);
  }
  return res.redirect(`/show/${id}/seats/${date}`);
};

module.exports.arrangement = async (req, res) => {
  const { id, year, month, day } = req.params;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) + 1);
  if (date < Date.now()) {
    return res.redirect("/home");
  }
  const permSeat = await Seats.find({ show: id, date: date });
  if (!permSeat.length) {
    return res.redirect(`/show/${id}`);
  }
  for (let currentSeat of permSeat) {
    const seat = await SeatLock.find({
      show: id,
      date: date,
      seatNo: currentSeat.seatNo,
    });

    if (currentSeat.occupied == true) {
      seat[0].lastBooked = null;
      seat[0].occupied = true;
      seat[0].user = null;
      seat[0].save();
    } else if (seat[0].occupied == true) {
      let currentTime = new Date();
      currentTime = Number(currentTime.getTime());
      let timestamp = seat[0].lastBooked;
      timestamp = Number(timestamp.getTime());

      if (timestamp < currentTime) {
        seat[0].occupied = false;
        seat[0].user = null;
        seat[0].save();
      }
    }
  }
  const seat = await SeatLock.find({
    show: id,
    date: date,
  });
  return res.render("arrangement", { seat, id, year, month, day });
};

module.exports.booked = async (req, res, next) => {
  const { id, year, month, day } = req.params;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) + 1);
  if (date < Date.now()) {
    return res.redirect("/home");
  }
  let seats = "";
  let alreadyBooked = false;
  let seatNumber = "";
  for (let i = 1; i <= 9; i++) {
    for (let j = 65; j <= 70; j++) {
      const seatCode = i + String.fromCharCode(j);
      if (req.body.hasOwnProperty(seatCode)) {
        const seat = await SeatLock.find({
          seatNo: seatCode,
          date: date,
          show: req.params.id,
        });
        if (!seat.length) {
          return res.redirect(`/show/${id}`);
        }
        if (seat[0].occupied == true && seat[0].user != req.user.id) {
          alreadyBooked = true;
          seatNumber += seatCode;
        }
        seats += seatCode;
      }
    }
  }
  const errorCode = "409 ";
  const errorMessage = "This seat is no longer available";
  const redirectUrl = `/show/${id}/seats/${year}-${month}-${day}`;
  const errorType = "seats";
  if (alreadyBooked) {
    return res.render("404", {
      errorCode,
      errorMessage,
      seatNumber,
      redirectUrl,
      errorType,
    });
  } else {
    for (let i = 0; i < seats.length; i += 2) {
      let seatCode = "";
      seatCode += seats[i];
      seatCode += seats[i + 1];
      const seat = await SeatLock.find({
        show: req.params.id,
        date: date,
        seatNo: seatCode,
      });
      seat[0].occupied = true;
      seat[0].user = req.user.id;
      let newDate = new Date();
      newDate.setMinutes(newDate.getMinutes() + 1);
      seat[0].lastBooked = newDate;
      await seat[0].save();
    }
    return res.redirect(
      `/show/${id}/seats/${year}-${month}-${day}/payment/${seats}`
    );
  }
};

module.exports.payment = async (req, res, next) => {
  const show = await Show.findById(req.params.id);
  const showName = show.title;
  const { id, year, month, day } = req.params;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) + 1);
  if (date < Date.now()) {
    return res.redirect("/home");
  }
  let seat = "";
  for (let i = 0; i < req.params.seats.length; i += 2) {
    seat += req.params.seats[i];
    seat += req.params.seats[i + 1];
    if (i + 2 < req.params.seats.length) seat += " , ";
  }
  const seats = req.params.seats.length;
  const totalSeats = seats / 2;
  const amount = totalSeats * 100;
  const user = await User.findOne({ _id: req.user.id });
  if (!user) {
    return res.redirect("/home");
  }
  const accountBalance = user.balance;
  const certificate = show.certificate;
  const language = show.language;
  const duration = show.duration;
  const director = show.director;
  const cast = show.cast;
  return res.render("payment", {
    certificate,
    director,
    cast,
    language,
    duration,
    showName,
    seat,
    amount,
    id,
    year,
    month,
    day,
    accountBalance,
    date,
  });
};

module.exports.paid = async (req, res, next) => {
  let currentSeats = "";
  const id = req.params.id;
  const show = await Show.findById(id);
  const { year, month, day } = req.params;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) + 1);
  if (date < Date.now()) {
    return res.redirect("/home");
  }
  for (let i = 0; i < req.params.seats.length; i++) {
    if (req.params.seats[i] == " " || req.params.seats[i] == ",") {
      continue;
    } else {
      currentSeats += req.params.seats[i];
    }
  }
  for (let i = 0; i < currentSeats.length; i += 2) {
    let seatCode = "";
    seatCode += currentSeats[i];
    seatCode += currentSeats[i + 1];
    const seat = await Seats.find({
      show: req.params.id,
      date: date,
      seatNo: seatCode,
    });
    if (seat[0].occupied == true) {
      return res.redirect(`/show/${id}`);
    }
  }
  let totalSeats = currentSeats.length / 2;
  let totalCost = totalSeats * 100;
  let user = await User.findOne({ _id: req.user.id });
  if (user.balance < totalCost) {
    const errorCode = "INSUFFICIENT_FUNDS";
    const errorMessage = "Payment Failed: Insufficient Funds";
    const errorType = "payment";
    const redirectUrl = "/profile";
    return res.render("404", {
      errorCode,
      errorMessage,
      errorType,
      redirectUrl,
    });
  }
  let newBalance = user.balance - totalCost;
  user.balance = newBalance;
  user.save();
  var data = {
    images: {
      logo: "https://res.cloudinary.com/dagjmj2ww/image/upload/v1687716382/Logo_gycfz9.jpg",
    },
    information: {
      date: new Date(),
      "due-date": date,
    },
    products: [
      {
        quantity: parseInt(totalSeats),
        description: show.title,
        tax: 0,
        price: 100,
      },
    ],
    settings: {
      currency: "INR",
    },
    "bottom-notice": "Seat number:-  " + req.params.seats,
    translate: {
      "due-date": "Date of booking",
    },
  };
  let result = await easyinvoice.createInvoice(data, async function (result) {
    await fs.writeFileSync("invoice.pdf", result.pdf, "base64");
  });
  result = await cloudinary.uploader.upload("invoice.pdf");

  let booking = await Booking.create({
    user: req.user.id,
    show: req.params.id,
    date: date,
    invoice: result.url,
  });

  for (let i = 0; i < currentSeats.length; i += 2) {
    let seatCode = "";
    seatCode += currentSeats[i];
    seatCode += currentSeats[i + 1];
    const seat = await Seats.find({
      show: req.params.id,
      date: date,
      seatNo: seatCode,
    });
    seat[0].occupied = true;
    await seat[0].save();
    booking.seatNo.push(seat[0].id);
  }
  booking.seat = req.params.seats;
  booking.showName = show.title;

  await booking.save();

  var data = fs.readFileSync("invoice.pdf");
  res.contentType("application/pdf");
  res.send(data);
  return;
};
