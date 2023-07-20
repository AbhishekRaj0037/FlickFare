const express = require("express");
const router = express.Router();
const shows = require("../controllers/shows");
const upload = require("../utils/multer");
const { isLoggedIn, isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.get("/:id", catchAsync(shows.index));

router.get("/delete/:id", isLoggedIn, isAdmin, catchAsync(shows.deleteShow));

router.post(
  "/createshow",
  isLoggedIn,
  isAdmin,
  upload.single("poster"),
  shows.createShow
);

module.exports = router;
