// In your routes file (e.g., bookingRoutes.js)
const express = require('express');
const router = express.Router();
const bookingListController = require('../controllers/bookingListController');
const passport = require('passport');
const Booking = require('../models/Booking');


// Fetch bookings for the authenticated user
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const userBookings = await Booking.find({ user: req.user._id });
      res.json(userBookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
