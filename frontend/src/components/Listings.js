import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal, Row, Col } from 'react-bootstrap';

function Listings() {
  const [listings, setListings] = useState([]);
  const [books, setBooks] = useState({});
  const [places, setPlaces] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newListingData, setNewListingData] = useState({
    book: '',
    condition: '',
    price: '',
    pickup: false,
    createdBy: '65f5d1a809170c47ce1f24a0', // Default createdBy
    purchasedBy: '', // Assuming this is not needed for new listings
    purchased: false,
  });

  useEffect(() => {
    fetchListings();
    fetchAllBooks();
    fetchAllPlaces();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      const booksMap = {};
      data.forEach(book => {
        booksMap[book._id] = book.title;
      });
      setBooks(booksMap);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchAllPlaces = async () => {
    try {
      const response = await fetch('http://localhost:8082/places');
      if (!response.ok) {
        throw new Error('Failed to fetch Places');
      }
      const data = await response.json();
      const placesMap = {};
      data.forEach(place => {
        placesMap[place._id] = place.title;
      });
      setBooks(placesMap);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListingData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleCreateListing = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/listings/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListingData),
      });
      if (!response.ok) {
        throw new Error('Failed to create new listing');
      }
      const data = await response.json();
      setListings(prevListings => [...prevListings, data]);
    } catch (error) {
      console.error('Error creating listing:', error);
    } finally {
      setShowCreateModal(false); // Close modal regardless of success or failure
      setNewListingData({
        book: '',
        condition: '',
        price: '',
        pickup: false,
        createdBy: '65f5d1a809170c47ce1f24a0',
        purchasedBy: '',
        purchased: false,
      });
    }
  };

  const fetchBookInfo = async (bookId) => {
    try {
      const res = await fetch(`http://localhost:8082/api/books/${bookId}`);
      const data = await res.json();
      return data.title;
    } catch (error) {
      console.error('Error fetching book information:', error);
    }
  };
  

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
      console.log()
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
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewListingData({
      book: '',
      condition: '',
      price: '',
      pickup: false,
      createdBy: '65f5d1a809170c47ce1f24a0',
      purchasedBy: '',
      purchased: false,
    });
  };

  const handleInformationClick = async (bookId) => {
    try {
      console.log(bookId)
      const response = await fetch(`http://localhost:8082/api/books/65f848bb0adbdf52882ddecc`);
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      const data = await response.json();
      setSelectedBook(data);
      setShowInfoModal(true);
      console.log(data)
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };
  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setSelectedBook(null);
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

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
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


      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="bookSelect">
              <Form.Label>Book</Form.Label>
              <Form.Control as="select" name="book" value={newListingData.book} onChange={handleInputChange}>
                <option value="">Select Book</option>
                {/* Populate options from fetched books */}
                {Object.keys(books).map(bookId => (
                  <option key={bookId} value={bookId}>{books[bookId]}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="conditionSelect">
              <Form.Label>Condition</Form.Label>
              <Form.Control as="select" name="condition" value={newListingData.condition} onChange={handleInputChange}>
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Okay">Okay</option>
                <option value="Poor">Poor</option>
                <option value="Damaged">Damaged</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="priceInput">
              <Form.Label>Price (USD)</Form.Label>
              <Form.Control type="number" name="price" value={newListingData.price} onChange={handleInputChange} />
            </Form.Group>
            
            <Button variant="primary" onClick={handleCreateListing}>Create</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Listings;
