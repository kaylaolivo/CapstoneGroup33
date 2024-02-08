// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load Book model
const Book = require('../../models/Book');

// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get('/', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// @route   GET api/books/:id
// @desc    Get single book by id
// @access  Public
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

// @route   POST api/books
// @desc    Add/save book
// @access  Public
router.post('/', (req, res) => {
  Book.create(req.body)
    .then(book => res.json({ msg: 'Book added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

// @route   PUT api/books/:id
// @desc    Update book by id
// @access  Public
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/books/:id
// @desc    Delete book by id
// @access  Public
router.delete('/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a book' }));
});

// @route   GET api/books/title/:title
// @desc    Get books by title
// @access  Public
router.get('/title/:title', (req, res) => {
    const title = req.params.title;
    Book.find({ title: { $regex: new RegExp(title, 'i') } })
      .then(books => res.json(books))
      .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
  });
  
  // @route   GET api/books/isbn/:isbn
  // @desc    Get books by ISBN
  // @access  Public
  router.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    Book.find({ isbn })
      .then(books => res.json(books))
      .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
  });
  
  // @route   GET api/books/author/:author
  // @desc    Get books by author
  // @access  Public
  router.get('/author/:author', (req, res) => {
    const author = req.params.author;
    Book.find({ author: { $regex: new RegExp(author, 'i') } })
      .then(books => res.json(books))
      .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
  });

module.exports = router;