// payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cardHolderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
