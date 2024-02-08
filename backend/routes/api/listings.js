const express = require('express');
const router = express.Router();
const Listing = require('../../models/Listing');


// @route   GET api/listings/test
// @desc    Tests courses route
// @access  Public
router.get('/test', (req, res) => res.send('List route testing!'));


// @route   POST api/listings
// @desc    Create a listing with a book id
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, userid, book, condition, price, pickup } = req.body;
    const newListing = new Listing({ name, userid, book, condition, price, pickup });
    await newListing.save();
    res.json(newListing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/listings/:id
// @desc    Edit an existing listing
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const listingId = req.params.id;
    const { name, userid, book, condition, price, pickup } = req.body;

    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      { name, userid, book, condition, price, pickup },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    res.json(updatedListing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/listings/user/:userid
// @desc    Return all listings made by a given user by userid
// @access  Public
router.get('/user/:userid', async (req, res) => {
  try {
    const userid = req.params.userid;
    const userlistings = await Listing.find({ userid });

    res.json(userlistings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/listings/:id
// @desc    Delete a listing
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const listingId = req.params.id;
    const deletedListing = await Listing.findByIdAndRemove(listingId);

    if (!deletedListing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    res.json({ msg: 'Listing deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/listings/book/:bookid
// @desc    Return all listings with associated bookid
// @access  Public
router.get('/book/:bookid', async (req, res) => {
  try {
    const bookid = req.params.bookid;
    const booklistings = await Listing.find({ book: bookid });

    res.json(booklistings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
