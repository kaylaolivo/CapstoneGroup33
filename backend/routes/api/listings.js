const express = require('express');
const router = express.Router();
const Places = require('../../models/Listing');
// Route: Add new listing
router.post('/add', async (req, res) => {
  try {
    const { book, condition, price, pickup, createdBy, purchasedBy, purchased } = req.body;
    const newListing = new Listing({ book, condition, price, pickup, createdBy, purchasedBy, purchased });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route: Return all listings
router.get('/all', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route: Return listings by createdBy
router.get('/createdBy/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const listings = await Listing.find({ createdBy: userId });
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route: Return listings by purchasedBy
router.get('/purchasedBy/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const listings = await Listing.find({ purchasedBy: userId });
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route: Return listings by book
router.get('/byBook/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const listings = await Listing.find({ book: bookId });
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
