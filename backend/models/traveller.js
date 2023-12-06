// Import Mongoose
const mongoose = require('mongoose');

//Schema
const personSchema = new mongoose.Schema
({
  firstName: 
  { type: String, 
    required: true 
},
  lastName:
   { type: String, 
    required: true
 },
  birthday:
   { type: Date, 
    required: true
 },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
