// Import Mongoose
const mongoose = require('mongoose');

// Flight Schema
const flightSchema = new mongoose.Schema({
  weekday: {
    type: Number,
    required: true
  },
  departure: {
    type: String,
    required: true
  },
  arrival: {
    type: String,
    required: true
  },
  aircraft: {
    type: String,
    required: true
  }
});

// Flight Model
const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
