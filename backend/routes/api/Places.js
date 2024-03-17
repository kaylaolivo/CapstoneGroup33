// This is for places, I randomly name it by this. --Yiran

const express = require('express');
const mongoose = require('mongoose');
const Places = require('../../models/Places');


mongoose.connect('mongodb+srv://keo76:39DGniD6B6j6Z7QO@cluster0.og9ozv7.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

/*const createPlaces = async (req, res, next) => {
  const newPlace = new Places({
    name: req.body.name,
    location: req.body.location, 
    zip: req.body.zip
  });

  const result = createPlaces.save();

  res.json(result);
};*/
const createPlaces = async (req, res, next) => {
    const newPlace = new Places({
      name: req.body.name,
      location: req.body.location, 
      zip: req.body.zip
    });
  
    try {
      
      const result = await newPlace.save();
      res.status(201).json(result); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Could not save the place." }); 
    }
  };

  const getPlaces = async (req, res, next) => {
    try {
      const places = await Places.find().exec();
      res.json(places);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch places." });
    }
  };
  
  

exports.createPlaces = createPlaces;
exports.getPlaces = getPlaces;