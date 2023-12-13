const mongoose = require('mongoose');
const Booking = require('../models/booking');

const bookingSchema = new mongoose.Schema({
  // Include all the fields you want to store from the Flight schema

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  weekday: {
    type: Number,
    required: true
  },
  departure: {
    iataCode: {
      type: String,
      required: true
    },
    scheduledTime: {
      type: String,
      required: true
    }
    // Include other fields from the departure location as needed
  },
  arrival: {
    iataCode: {
      type: String,
      required: true
    },
    scheduledTime: {
      type: String,
      required: true
    }
    // Include other fields from the arrival location as needed
  },
  aircraft: {
    modelText: {
      type: String,
      required: true
    }
    // Include other fields from the aircraft as needed
  },
  // Add other fields as needed
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
