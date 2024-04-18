// routes/api/books.js

const express = require('express');
const router = express.Router();
const Book = require('../../models/Book');

// @route   GET api/books
// @desc    Get all books or search by any field present in the schema
// @access  Public
router.get('/', (req, res) => {
  const queryParams = req.query;
  let query = {};

  // Iterate over request query parameters
  Object.keys(queryParams).forEach(param => {
    // For each query parameter, add it to the query object with a regex pattern
    query[param] = { $regex: new RegExp(queryParams[param], 'i') };
  });

  Book.find(query)
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// @route   POST api/books
// @desc    Add a new book
// @access  Public
router.post('/', (req, res) => {
  const { title, author, genre, description, image, isbn, publicationYear, language, pageCount, publisher, courseName } = req.body;
  const newBook = new Book({
    title,
    author,
    genre,
    description,
    image,
    isbn,
    publicationYear,
    language,
    pageCount,
    publisher,
    courseName
  });
  newBook.save()
    .then(book => res.json(book))
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

module.exports = router;
