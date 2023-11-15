require('dotenv').config();


const express = require('express');
const cors = require('cors')
const axios = require('axios');
const searchFlightsRoutes = require('./routes/searchFlights');
const mongoose = require('mongoose');


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

mongoose.connect('mongodb+srv://airfly_db:airfly_db@renee.iku2dns.mongodb.net/renee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('Connection error', err);
});


//app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use('/api/search-flights', searchFlightsRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a AirFly Backend!');
});

app.listen(port, () => {
  console.log(`Backend ejecutándose en http://localhost:${port}`);
});
