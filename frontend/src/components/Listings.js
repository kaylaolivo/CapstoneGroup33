import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal, Row, Col } from 'react-bootstrap';

function Listings() {
  const [listings, setListings] = useState([]);
  const [books, setBooks] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const handlePurchaseClick = (listingId, price, bookName) => {
    // Handle purchase logic here
    fetch('http://localhost:8082/api/checkoutRoute', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: listingId, quantity: 1, price: price, bookName: bookName },
        ],
      }),
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url; // Redirect the user to the checkout URL
      })
      .catch(e => {
        console.error(e.error);
        // Handle any errors that occur during the checkout process
      });
    console.log("Purchase button clicked for listing ID:", listingId);
  };

  const fetchListings = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/listings/all');
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = await response.json();
      const filteredListings = data.filter(listing => !listing.purchased);
      setListings(filteredListings);
      fetchBookTitles(filteredListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };
  

  const fetchBookTitles = async (listings) => {
    const bookIds = listings.map(listing => listing.book._id);
    try {
      const promises = bookIds.map(bookId =>
        fetch(`http://localhost:8082/api/books/65f848bb0adbdf52882ddecc`)
          .then(response => response.json())
          .then(data => ({ [bookId]: data.title }))
      );
      const titles = await Promise.all(promises);
      const titlesMap = Object.assign({}, ...titles);
      setBooks(titlesMap);
    } catch (error) {
      console.error('Error fetching book titles:', error);
    }
  };

  const handleCreateListingClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleInformationClick = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/books/65f848bb0adbdf52882ddecc`);
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      const data = await response.json();
      setSelectedBook(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  return (
    <div>
      <h1>Listings</h1>
      <Button variant="success" onClick={handleCreateListingClick}>Create New Listing</Button>

      <Row xs={1} md={2} lg={3} className="g-4">
        {listings.map(listing => (
          <Col key={listing._id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={listing.book.image} />
              <Card.Body>
                <Card.Title>{books[listing.book._id]}</Card.Title>
                <Card.Text>
                  Condition: {listing.condition}<br />
                  Price: {listing.price}<br />
                  Pickup: {listing.pickup ? 'Yes' : 'No'}<br />
                  Purchased: {listing.purchased ? 'Yes' : 'No'}<br />
                </Card.Text>
                {!listing.purchased && (
                  <>
                    <Button variant="primary" onClick={() => handleInformationClick(listing.book._id)}>Information</Button>
                    {' '}
                    <Button variant="success" onClick={() => handlePurchaseClick(listing._id, listing.price, books[listing.book._id])}>Purchase</Button>

                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook && (
            <div>
              <h2>{selectedBook.title}</h2>
              <p>Author: {selectedBook.author}</p>
              <p>Genre: {selectedBook.genre}</p>
              <p>Description: {selectedBook.description}</p>
              <p>ISBN: {selectedBook.isbn}</p>
              <p>Publication Year: {selectedBook.publicationYear}</p>
              <p>Language: {selectedBook.language}</p>
              <p>Page Count: {selectedBook.pageCount}</p>
              <p>Publisher: {selectedBook.publisher}</p>
              <img src={selectedBook.image} alt="Book Cover" style={{ maxWidth: '100%' }} /> {/* Display book image */}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Listings;
