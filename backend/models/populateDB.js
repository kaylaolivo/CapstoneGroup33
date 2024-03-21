// populateDB.js

const mongoose = require('mongoose');
const Book = require('C:\\Users\\Hariraj\\Desktop\\CapstoneGroup33\\backend\\models\\Book.js'); // Assuming this is the correct path to your Book model

// Connect to MongoDB
mongoose.connect('mongodb+srv://keo76:39DGniD6B6j6Z7QO@cluster0.og9ozv7.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Dummy data
const dummyBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    description: 'A story of decadence and excess in the Jazz Age.',
    image: 'https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1',
    isbn: '9780141182636',
    publicationYear: 1925,
    language: 'English',
    pageCount: 218,
    publisher: 'Scribner',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    description: 'A powerful story of racial injustice and moral growth set in the American South.',
    image: 'https://media.glamour.com/photos/56e1f3c462b398fa64cbd304/master/w_1600%2Cc_limit/entertainment-2016-02-18-main.jpg',
    isbn: '9780061120084',
    publicationYear: 1960,
    language: 'English',
    pageCount: 281,
    publisher: 'J. B. Lippincott & Co.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    description: 'A dystopian novel depicting a totalitarian regime and the dangers of mass surveillance.',
    image: 'https://m.media-amazon.com/images/I/71je3-DsQEL._AC_UF1000,1000_QL80_.jpg',
    isbn: '9780451524935',
    publicationYear: 1949,
    language: 'English',
    pageCount: 328,
    publisher: 'Secker & Warburg',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J. D. Salinger',
    genre: 'Literary Fiction',
    description: 'A novel about teenage angst, alienation, and the search for identity.',
    image: 'https://m.media-amazon.com/images/I/8125BDk3l9L._AC_UF1000,1000_QL80_.jpg',
    isbn: '9780316769488',
    publicationYear: 1951,
    language: 'English',
    pageCount: 277,
    publisher: 'Little, Brown and Company',
  },

];

// Function to populate the database
async function populateDatabase() {
  try {
    // Delete existing data to start fresh
    await Book.deleteMany({});

    // Insert dummy data
    await Book.insertMany(dummyBooks);

    console.log('Database populated successfully.');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    // Close the connection
    mongoose.disconnect();
  }
}

// Call the function to populate the database
populateDatabase();
