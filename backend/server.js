require('dotenv').config();

const express = require('express');
const cors = require('cors')
const axios = require('axios');
const searchFlightsRoutes = require('./routes/searchFlights');

const app = express();
const port = 3001;



const corsOptions = {
  origin: function (origin, callback) {
      if (!origin || origin.startsWith('http://localhost:')) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  }
};

app.use(cors(corsOptions));





//app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use('/api/search-flights', searchFlightsRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a AirFly Backend!');
});

app.listen(port, () => {
  console.log(`Backend ejecutándose en http://localhost:${port}`);
});
