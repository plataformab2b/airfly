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


    res.status(200).json(flightsData);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).send('Error fetching flight data');
  }
};