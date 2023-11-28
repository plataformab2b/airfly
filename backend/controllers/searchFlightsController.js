const axios = require('axios');

exports.searchFlights = async (req, res) => {
  const { fromAirportCode, toAirportCode, fromDate } = req.body;
  const apiKey = process.env.API_KEY;
  const url = 'https://aviation-edge.com/v2/public/flightsFuture';
  const params = {
    date: fromDate,
    key: apiKey,
    type: 'departure',
    arr_iataCode: toAirportCode,
    iataCode: fromAirportCode
  };

  try {
    const response = await axios.get(url, { params });
    const flightsData = response.data;

    // Maneja aquí los datos de vuelo como necesites, por ejemplo, enviándolos de vuelta al cliente
    res.status(200).json(flightsData);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).send('Error fetching flight data');
  }
  try {
    const response = await axios.get(url, { params });
    const flightsData = response.data;

    // Save the flight data to the database
    const newFlight = new Flight({
      weekday: 1, // Replace with the actual weekday value
      departure: 'AirportA', // Replace with the actual departure value
      arrival: 'AirportB', // Replace with the actual arrival value
      aircraft: 'Boeing 747' // Replace with the actual aircraft value
      // Add other fields as needed
    });

    await newFlight.save();

    // Send the flight data back to the client or do other processing as needed
    res.status(200).json(flightsData);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).send('Error fetching flight data');
  }
};

