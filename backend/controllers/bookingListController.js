// bookingListController.js

const Booking = require('../models/booking');

const createBooking = async (req, res) => {
  try {
    // Assuming you have the flightId and userId from the selected flight and logged-in user
    const { flightId, userId } = req.body;

    const newBooking = new Booking({
      
      user: userId,
      // Add other booking details as needed
    });

    const savedBooking = await newBooking.save();

    res.json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const addBooking = async (req, res) => {
  try {
    // Create a new booking using the Booking schema and save it to the database
    const newBooking = new Booking({
      weekday: req.body.weekday,
      departure: req.body.departure,
      arrival: req.body.arrival,
      aircraft: req.body.aircraft,
      // Add other fields as needed
    });
    await newBooking.save();

    res.json(newBooking); // Return the added booking in the response
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getUserBookings = async (req, res) => {
  try {
    // Fetch bookings associated with the authenticated user
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
    const userBookings = await Booking.find({ userId });

    res.json(userBookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUserBookings,
  getAllBookings,
  getBookingById,
  addBooking,
  createBooking,
  // Add other exported functions here...
};
