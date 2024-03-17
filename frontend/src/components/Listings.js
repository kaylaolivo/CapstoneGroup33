import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';

function Listings() {
  const [listings, setListings] = useState([]);
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newListingData, setNewListingData] = useState({
    book: '',
    condition: '',
    price: '',
    pickup: false,
    createdBy: '', // Assuming you have a way to determine the current user
    purchasedBy: null,
    purchased: false,
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const response = await fetch('/api/listings/all');
    const data = await response.json();
    setListings(data);
  };

  const fetchBooks = async () => {
    const response = await fetch('/api/books');
    const data = await response.json();
    setBooks(data);
  };

  const handleCreateListingClick = () => {
    setShowModal(true);
    fetchBooks();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewListingData({
      book: '',
      condition: '',
      price: '',
      pickup: false,
    });
  };

  const handleCreateListing = async () => {
    try {
      const response = await fetch('/api/listings/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListingData),
      });
      const data = await response.json();
      setListings([...listings, data]);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  const handlePurchase = async (id) => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ purchased: true }),
      });
      if (response.ok) {
        setListings(listings.map(listing => listing._id === id ? { ...listing, purchased: true } : listing));
      } else {
        console.error('Failed to mark listing as purchased');
      }
    } catch (error) {
      console.error('Error marking listing as purchased:', error);
    }
  };

  return (
    <div>
      <h1>Listings</h1>
      <Button variant="success" onClick={handleCreateListingClick}>Create New Listing</Button>

      <div className="listings-container">
        {listings.map(listing => (
          <Card key={listing._id} style={{ width: '18rem' }} className="listing-card">
            <Card.Body>
              <Card.Title>{listing.book.title}</Card.Title>
              <Card.Text>
                Condition: {listing.condition}<br />
                Price: {listing.price}<br />
                Pickup: {listing.pickup ? 'Yes' : 'No'}<br />
                Purchased: {listing.purchased ? 'Yes' : 'No'}<br />
              </Card.Text>
              {!listing.purchased && (
                <Button variant="primary" onClick={() => handlePurchase(listing._id)}>Purchase</Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBook">
              <Form.Label>Select Book</Form.Label>
              <Form.Control as="select" value={newListingData.book} onChange={(e) => setNewListingData({ ...newListingData, book: e.target.value })}>
                <option value="">-- Select Book --</option>
                {books.map(book => (
                  <option key={book._id} value={book._id}>{book.title}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Add other form fields here for condition, price, pickup */}

            <Button variant="primary" type="button" onClick={handleCreateListing}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Listings;
