if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const showsRoute = require("./routes/shows");
const usersRoute = require("./routes/users");
const reviewsRoute = require("./routes/reviews");
const seatsRoute = require("./routes/seats");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const show = require("./models/show");
const expressError = require("./utils/ExpressError");
const flash = require("connect-flash");
require("./config/passport-config");
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/flick-fare";

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

mongoose.connect(dbUrl).then(() => console.log("Database connected!"));

app.use(
  session({
    secret: "secret0037",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({ mongoUrl: dbUrl }),
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get("/", async (req, res, next) => {
  return res.render("landing");
});

app.get("/home", async (req, res, next) => {
  const shows = await show.find({}).lean();
  return res.render("index", { shows });
});

app.use("/show", showsRoute);
app.use("/", usersRoute);
app.use("/show", reviewsRoute);
app.use("/", seatsRoute);

app.all("*", (req, res, next) => {
  const errorCode = "404";
  const errorMessage = "Page Not Found";
  const redirectUrl = "/home";
  const errorType = "Not Found";
  return res.render("404", { errorCode, errorMessage, redirectUrl, errorType });
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  // res.status(statusCode).render("error", { err });
  const errorCode = "500";
  const errorMessage = "Internal Server Error";
  const errorType = "ERR_SOMETHING_WENT_WRONG";
  const redirectUrl = "/home";
  return res.render("404", { redirectUrl, errorCode, errorMessage, errorType });
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static("public"));

app.listen(3000, (error) => {
  if (!error) {
    console.log("Server started successfully");
  } else {
    console.log(`Error ${error} occured`);
  }
});
