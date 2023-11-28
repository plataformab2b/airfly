require('dotenv').config();

const express = require('express');
const cors = require('cors')
const axios = require('axios');
const searchFlightsRoutes = require('./routes/searchFlights');
const mongoose = require('mongoose');
const port = 3001;
//new from JWT
const session = require('express-session');
const User = require('./models/user')
const accountController = require('./controllers/accountController')
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const passport = require('passport');


const app = express();
app.use(session({
  secret: 'some secret value', // Reemplaza esto con tu propia clave secreta
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));
require('./middlewares/auth.js')()
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
app.use(passport.initialize());

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
  //  useNewUrlParser: true,
  //useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('Connection error', err);
});



app.use(express.json());
app.use('/api/search-flights', searchFlightsRoutes);
// new from JWT
app.get('/profile', passport.authenticate('jwt', { session: false }), accountController.profile)
app.post('/login', passport.authenticate('local'), accountController.login)
app.post('/register', accountController.register)

app.get('/', (req, res) => {
  res.send('Welcome to AirFly Backend!');
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
