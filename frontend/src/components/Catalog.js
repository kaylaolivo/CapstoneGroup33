import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Catalog.css'; // Import CSS file for styling

const Catalog = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8082/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      // Handle error fetching books
    }
  };

  return (
    <div className="catalog-container">
      {books.map(book => (
        <div key={book._id} className="book-card">
          <img src={book.image} alt={book.title} className="book-img" />
          <div className="book-details">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Publication Year:</strong> {book.publicationYear}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Page Count:</strong> {book.pageCount}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
