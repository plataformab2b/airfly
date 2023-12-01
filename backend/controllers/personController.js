// controllers/personController.js
const Person = require('../models/Person');
// controllers/personController.js
const PersonController = {
    getAllPersons: async (req, res) => {
      try {
        const persons = await Person.find();
        res.json(persons);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    createPerson: async (req, res) => {
      try {
        const { firstName, lastName, birthday } = req.body;
        const newPerson = new Person({ firstName, lastName, birthday });
        await newPerson.save();
        res.status(201).json(newPerson);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    // Add more controller methods as needed (e.g., updatePerson, deletePerson).
  };
  
  module.exports = PersonController;
  