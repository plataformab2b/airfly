const express = require('express');
const cors = require('cors'); // Asegúrate de requerir cors
const router = express.Router();
const searchFlightsController = require('../controllers/searchFlightsController');

router.use(cors()); // Usa router.use en lugar de app.use
router.post('/', searchFlightsController.searchFlights);

module.exports = router;
