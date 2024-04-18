import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Textbooks.css';
import Catalog from './Catalog';
import SearchBooks from './SearchBooks'; // Import the SearchBooks component

const Textbooks = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    image: '',
    isbn: '',
    publicationYear: '',
    language: '',
    pageCount: '',
    publisher: ''
  });

  const [courses, setCourses] = useState([]);
  const [books, setBooks] = useState([]);
  const [showCatalog, setShowCatalog] = useState(false);

  const { title, author, genre, description, image, isbn, publicationYear, language, pageCount, publisher, course } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8082/api/books', formData);
      console.log(res.data);
      fetchBooks(); 
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const toggleCatalog = () => setShowCatalog(!showCatalog);

  const fetchBooks = async (searchQuery = '') => {
    try {
      const res = await axios.get(`http://localhost:8082/api/books?search=${searchQuery}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:8082/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="textbooks-container">
      <h2 className="textbooks-title">Add New Textbook</h2>
      <form onSubmit={e => onSubmit(e)} className="textbooks-form">
      <div className="textbooks-form-group">
          <input type="text" placeholder="Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Author" name="author" value={author} onChange={e => onChange(e)} required />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Genre" name="genre" value={genre} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Description" name="description" value={description} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Image URL" name="image" value={image} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="ISBN" name="isbn" value={isbn} onChange={e => onChange(e)} required />
        </div>
        <div className="textbooks-form-group">
          <input type="number" placeholder="Publication Year" name="publicationYear" value={publicationYear} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Language" name="language" value={language} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="number" placeholder="Page Count" name="pageCount" value={pageCount} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Publisher" name="publisher" value={publisher} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <select name="course" value={course} onChange={e => onChange(e)}>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course._id} value={course.name}>
                {course.name} - {course.code}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="textbooks-btn">Add Textbook</button>
      </form>
      <div className="catalog-btn-container">
        <button onClick={toggleCatalog} className="catalog-btn">
          {showCatalog ? 'Hide Catalog' : 'Show Catalog'}
        </button>
      </div>
      {showCatalog && <Catalog books={books} />} {/* Pass books as props to Catalog component */}
    </div>
  );
};

export default Textbooks;


/*

<form onSubmit={e => onSubmit(e)} className="textbooks-form">
        <div className="textbooks-form-group">
          <input type="text" placeholder="Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Author" name="author" value={author} onChange={e => onChange(e)} required />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Genre" name="genre" value={genre} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Description" name="description" value={description} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Image URL" name="image" value={image} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="ISBN" name="isbn" value={isbn} onChange={e => onChange(e)} required />
        </div>
        <div className="textbooks-form-group">
          <input type="number" placeholder="Publication Year" name="publicationYear" value={publicationYear} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Language" name="language" value={language} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="number" placeholder="Page Count" name="pageCount" value={pageCount} onChange={e => onChange(e)} />
        </div>
        <div className="textbooks-form-group">
          <input type="text" placeholder="Publisher" name="publisher" value={publisher} onChange={e => onChange(e)} />
        </div>
        <button type="submit" className="textbooks-btn">Add Textbook</button>
      </form>

      */