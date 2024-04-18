import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';

const CourseDetail = (props) => {
  const [books, setBooks] = useState([]);
  const cardRef = useRef(null);

  const [show, setShow] = useState(props.modal);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const bookDetails = [];
      for (const bookId of props.course.availableBooks.bookIds) {
        try {
          console.log(bookId);
          const response = await fetch(`http://localhost:8082/api/books/${bookId}`);
          if (response.ok) {
            const data = await response.json();
            bookDetails.push(data);
            console.log('im here')
          } else {
            console.error(`Error fetching book with ID ${bookId}`);
          }
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      }
      setBooks(bookDetails);
    };
  
    fetchBooks();
    console.log(books);
  }, [props.course.availableBooks]);

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
          // Conditionally render the Card component
          <Modal show={props.modal} onHide={handleClose} backdrop={false}>
            <Modal.Header>Books for {props.course.name}</Modal.Header>
            <Modal.Body>
              <div className="books-container">
                {books.map(book => (
                  <div key={book._id} className="book">
                    <img src={book.image} alt={book.title} />
                    <p>{book.title}</p>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>

  );
}
export default CourseDetail;