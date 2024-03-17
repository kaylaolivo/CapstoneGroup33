// major.js

const express = require('express');
const router = express.Router();
const Major = require('../../models/Major');

// Route to add a new major if it doesn't exist
router.post('/add', async (req, res) => {
  const { name, code } = req.body;

  try {
    // Check if the major with the given code already exists
    const existingMajor = await Major.findOne({ code });

    if (existingMajor) {
      return res.status(400).json({ error: 'Major with this code already exists' });
    }

    // Create a new major
    const newMajor = new Major({ name, code });
    await newMajor.save();

    res.status(201).json(newMajor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/getall', async (req, res) => {
    try {
      // Retrieve all majors
      const allMajors = await Major.find();
      
      res.status(200).json(allMajors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports = router;
