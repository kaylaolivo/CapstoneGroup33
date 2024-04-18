const express = require('express');
const router = express.Router();
const Book = require('../../models/Book')
const Course = require('../../models/Course');

console.log('Course Model:', Course); // Add this line for debugging



// @route   GET api/courses/test
// @desc    Tests courses route
// @access  Public
router.get('/test', (req, res) => res.send('course route testing!'));


// @route   POST api/courses
// @desc    Create a new course
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, code, requiredBooks } = req.body;
    const course = new Course({ name, code, requiredBooks });
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/courses/:id
// @desc    Delete a course by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    await course.remove();
    res.json({ msg: 'Course deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/courses/:id
// @desc    Edit a course by ID
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const { name, code, requiredBooks } = req.body;
    const course = await Course.findByIdAndUpdate(
      courseId,
      { name, code, requiredBooks },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/courses/:courseId/addBook/:isbn
// @desc    Add book by ISBN to the list of books in a given course
// @access  Public
router.post('/:courseId/addBook/:isbn', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const isbn = req.params.isbn;

    const course = await Course.findById(courseId);
    const book = await Book.findById({ isbn });

    if (!course || !book) {
      return res.status(404).json({ msg: 'Course or Book not found' });
    }

    course.requiredBooks.push(book._id);
    await course.save();

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/code/:code
// @desc    Get a course by course code
// @access  Public
router.get('/code/:code', async (req, res) => {
  try {
    const code = req.params.code;
    const course = await Course.findOne({ code });

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/title/:title
// @desc    Get a course by title
// @access  Public
router.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const course = await Course.findOne({ name: title });

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route GET api/courses/returnall
router.get('/returnall', async (req, res) => {
  try {
    // Find all documents in the collection
    const courses = await Course.find({});

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @route   PUT api/courses/addBook/:courseName/:isbn
// @desc    Add a book to a course's availableBooks array after uploading
// @access  Public
router.put('/addBook/:courseId/:bookId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    
    console.log(courseId);
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    console.log(bookId)

    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          "availableBooks.bookIds": bookId
        },
      },
      {new: true});

    console.log(course.name);
    console.log(course.code);
    

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    if (!book) {
      return res.status(404).json({ msg: 'book not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   PUT api/courses/removeBook/:courseName/:isbn
// @desc    Remove a book from a course's availableBooks array after a sale
// @access  Public
router.put('/removeBook/:courseName/:isbn', async (req, res) => {
  try {
    const courseName = req.params.courseName;
    const isbn = req.params.isbn;

    const course = await Course.findOne({ name: courseName });
    const book = await Book.findOne({ isbn });

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    if (!book) {
      return res.status(404).json({ msg: 'book not found' });
    }

    // Remove the book's ObjectId from the availableBooks array
    course.availableBooks = course.availableBooks.filter(bookId => bookId.toString() !== book._id.toString());
    await course.save();

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
