const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.bookEvent);
router.get("/:userId", bookingController.getUserBookings);

module.exports = router;
