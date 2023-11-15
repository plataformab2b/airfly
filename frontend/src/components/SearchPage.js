import React, { useState } from 'react';
import axios from 'axios';
import airportsData from '../data/airports'; // Importing airport data

const SearchPage = () => {
  // State to handle user selections and airport codes
  const [search, setSearch] = useState({
    fromCity: '',
    toCity: '',
    fromDate: '',
    toAirportCode: '',
    fromAirportCode: ''
  });

  // State to store flight data retrieved from the backend
  const [flightsData, setFlightsData] = useState([]);

  // Handler for changes in city fields
  const handleCityChange = (e) => {
    const { name, value } = e.target;
    setSearch(prevSearch => ({
      ...prevSearch,
      [name]: value,
      // Reset airport code when city changes
      ...(name === 'fromCity' && { fromAirportCode: '' }),
      ...(name === 'toCity' && { toAirportCode: '' })
    }));
  };

  // Handler for changes in the number of passengers
const handlePassengersChange = (e) => {
  const { name, value } = e.target;
  setSearch((prevSearch) => ({
    ...prevSearch,
    [name]: value,
  }));
};


  // Handler for changes in airport fields
  const handleAirportChange = (e, cityType) => {
    const airportName = e.target.value;
    const cityData = airportsData.find(city => city.city === search[`${cityType}City`]);
    const airportCode = cityData.airports.find(airport => airport.name === airportName).code;

    setSearch(prevSearch => ({
      ...prevSearch,
      [`${cityType}AirportCode`]: airportCode
    }));
  };

  // Function to fetch flight data from the backend
  const fetchFlightsData = async (searchParams) => {
    try {
      const response = await axios.post('http://localhost:3001/api/search-flights', searchParams);
      setFlightsData(response.data); // Storing the flight data
    } catch (error) {
      if (error.response) {
          // La solicitud se hizo y el servidor respondió con un estado fuera del rango 2xx
          console.log(error.response.data);
          console.log(error.response.status);
      } else if (error.request) {
          // La solicitud se hizo pero no se recibió respuesta
          console.log(error.request);
      } else {
          // Algo más causó el error
          console.log('Error', error.message);
      }
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      fromCity: search.fromCity,
      fromAirportCode: search.fromAirportCode,
      toCity: search.toCity,
      toAirportCode: search.toAirportCode,
      fromDate: search.fromDate
    };
    // Fetching flight data after form submission
    fetchFlightsData(submissionData);
  };

  return (
    <div>
      <h1>Flight Booking System</h1>
      <form onSubmit={handleSubmit}>

        {/* Dropdown to select the departure city */}
        <label htmlFor="fromCity">From City</label>
        <select name="fromCity" onChange={handleCityChange} value={search.fromCity}>
          {airportsData.map((entry, index) => (
            <option key={index} value={entry.city}>
              {entry.city}
            </option>
          ))}
        </select>

        {/* Dropdown to select the departure airport if a city has been selected */}
        {search.fromCity && (
          <>
            <label htmlFor="fromAirport">From Airport</label>
            <select name="fromAirport" onChange={(e) => handleAirportChange(e, 'from')}>
              {airportsData.find(city => city.city === search.fromCity).airports.map((airport, index) => (
                <option key={index} value={airport.name}>
                  {airport.name}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Dropdown to select the destination city */}
        <label htmlFor="toCity">To City</label>
        <select name="toCity" onChange={handleCityChange} value={search.toCity}>
          {airportsData.map((entry, index) => (
            <option key={index} value={entry.city}>
              {entry.city}
            </option>
          ))}
        </select>

        {/* Dropdown to select the destination airport if a city has been selected */}
        {search.toCity && (
          <>
            <label htmlFor="toAirport">To Airport</label>
            <select name="toAirport" onChange={(e) => handleAirportChange(e, 'to')}>
              {airportsData.find(city => city.city === search.toCity).airports.map((airport, index) => (
                <option key={index} value={airport.name}>
                  {airport.name}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Input to select the date */}
        <label htmlFor="fromDate">Date</label>
        <input
            type="date"
            name="fromDate"
            onChange={handleCityChange}
            value={search.fromDate}
        />

        {/* Input to enter the number of passengers */}
      <label htmlFor="passengers">Number of Passengers</label>
      <input
        type="number"
        name="passengers"
        onChange={handlePassengersChange}
        value={search.passengers}
      />

        {/* Button to submit the form */}
        <button type="submit">Search</button>
      </form>
      
      {/* Displaying the flight data in a table */}
      {flightsData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Weekday</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Aircraft</th>
            </tr>
          </thead>
          <tbody>
            {flightsData.map((flight, index) => (
              <tr key={index}>
                <td>{flight.weekday}</td>
                <td>{`${flight.departure.iataCode} - ${flight.departure.scheduledTime}`}</td>
                <td>{`${flight.arrival.iataCode} - ${flight.arrival.scheduledTime}`}</td>
                <td>{flight.aircraft.modelText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchPage;
