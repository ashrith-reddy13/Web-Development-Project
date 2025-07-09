const Booking = require("../models/Booking");
const Event = require("../models/Event");

exports.bookEvent = async (req, res) => {
  try {
    const { userId, eventId, seats } = req.body;
    const booking = new Booking({ user: userId, event: eventId, seats });
    await booking.save();
    await Event.findByIdAndUpdate(eventId, { $push: { bookedSeats: { $each: seats } } });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId }).populate("event");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
