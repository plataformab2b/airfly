import React, { useState, useEffect} from 'react';
import axios from 'axios';
import airportsData from '../data/airports'; // Importing airport data
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { isAuthenticated } from '../utils/authService'
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  useEffect(() => {
    // Set default cities and airports when the component mounts
    const defaultFromCity = airportsData[0].city;
    const defaultToCity = airportsData[1].city;
    const defaultFromAirportCode = airportsData[0].airports[0].code;
    const defaultToAirportCode = airportsData[1].airports[0].code;

    setSearch({
      fromCity: defaultFromCity,
      toCity: defaultToCity,
      fromDate: '',
      fromAirportCode: defaultFromAirportCode,
      toAirportCode: defaultToAirportCode
    });
  }, []);


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
    
    if (cityData) {
      const airport = cityData.airports.find(airport => airport.name === airportName);
      const airportCode = airport ? airport.code : '';

      setSearch(prevSearch => ({
        ...prevSearch,
        [`${cityType}AirportCode`]: airportCode
      }));
    }
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

    // Redirect to the booking page
  };

   // Function to handle the selection of a flight and navigation to the booking form
   const handleSelectBooking = async (selectedFlight) => {
    // Include flight ID in the submission data
    const submissionWithId = {
      ...selectedFlight,
      id: selectedFlight._id,
    };
  
    // Save the selected flight data into the state
    setSelectedBooking(submissionWithId);
  
    // Navigate to the booking form
    navigate('/booking-form', { state: { selectedFlight: submissionWithId } })
      //.catch((error) => console.error('Error navigating to booking form:', error));
  };



  return (
    <div className="container mt-5">
      <h1 className="mb-4">Flight Booking System</h1>
      {isAuthenticated() ? (
        <>
          {/* Form only shown if user is authenticated */}
          <form onSubmit={handleSubmit}>
            {/* Dropdown to select the departure city */}
            <div className="mb-3">
              <label htmlFor="fromCity" className="form-label">From City</label>
              <select className="form-select" name="fromCity" onChange={handleCityChange} value={search.fromCity}>
                {airportsData.map((entry, index) => (
                  <option key={index} value={entry.city}>
                    {entry.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown to select the departure airport if a city has been selected */}
            {search.fromCity && (
              <div className="mb-3">
                <label htmlFor="fromAirport" className="form-label">From Airport</label>
                <select className="form-select" name="fromAirport" onChange={(e) => handleAirportChange(e, 'from')}>
                  {airportsData.find(city => city.city === search.fromCity).airports.map((airport, index) => (
                    <option key={index} value={airport.name}>
                      {airport.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Dropdown to select the destination city */}
            <div className="mb-3">
              <label htmlFor="toCity" className="form-label">To City</label>
              <select className="form-select" name="toCity" onChange={handleCityChange} value={search.toCity}>
                {airportsData.map((entry, index) => (
                  <option key={index} value={entry.city}>
                    {entry.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown to select the destination airport if a city has been selected */}
            {search.toCity && (
              <div className="mb-3">
                <label htmlFor="toAirport" className="form-label">To Airport</label>
                <select className="form-select" name="toAirport" onChange={(e) => handleAirportChange(e, 'to')}>
                  {airportsData.find(city => city.city === search.toCity).airports.map((airport, index) => (
                    <option key={index} value={airport.name}>
                      {airport.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Input to select the date */}
            <div className="mb-3">
              <label htmlFor="fromDate" className="form-label">Date</label>
              <input type="date" className="form-control" name="fromDate" onChange={handleCityChange} value={search.fromDate} />
            </div>

            {/* Input to enter the number of passengers */}
            <div className="mb-3">
              <label htmlFor="passengers" className="form-label">Number of Passengers</label>
              <input type="number" className="form-control" name="passengers" onChange={handlePassengersChange} value={search.passengers} />
            </div>

            {/* Button to submit the form */}
            {isAuthenticated() && (
              <button type="submit" className="btn btn-primary">Search</button>
            )}
          </form>

          {/* Displaying the flight data in a table */}
          {flightsData.length > 0 && (
            <table className="table mt-4">
            <thead>
              <tr>
                <th>Weekday</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Aircraft</th>
                <th style={{width: '100px'}}>Book</th>
                
              </tr>
            </thead>
            <tbody>
              {flightsData.map((flight, index) => (
                <tr key={index}>
                  <td>{flight.weekday}</td>
                  <td>{`${flight.departure.iataCode} - ${flight.departure.scheduledTime}`}</td>
                  <td>{`${flight.arrival.iataCode} - ${flight.arrival.scheduledTime}`}</td>
                  <td>{flight.aircraft.modelText}</td>
                  <td>
                  {isAuthenticated() && (
                    <button 
                      className="btn btn-primary"
                      style={{marginLeft: 'auto', display: 'block'}}  
                      onClick={() => handleSelectBooking(flight)}>
                    Select
                    </button>
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </>
      ) : (
        // Message shown if user is not authenticated
        <p>User is not logged in</p>
      )}
    </div>
  );
};

export default SearchPage;