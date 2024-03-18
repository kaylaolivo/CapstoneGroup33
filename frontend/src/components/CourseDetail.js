import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';

const CourseDetail = (props) => {
  const [books, setBooks] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:8082/books?course=${props.course._id}`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, [props.course._id]);

  const handleOutsideClick = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      props.setSelectedCourse(); // Call setSelectedCourse(null) to close the CourseDetail
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="overlay">
      <div className="modal">
        {books.length > 0 && ( // Conditionally render the Card component
          <Card ref={cardRef}>
            <Card.Header>Books for {props.course.name}</Card.Header>
            <Card.Body>
              <div className="books-container">
                {books.map(book => (
                  <div key={book._id} className="book">
                    <img src={book.image} alt={book.title} />
                    <p>{book.title}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}
export default CourseDetail;