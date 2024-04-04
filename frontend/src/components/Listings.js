import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal, Row, Col, Container } from 'react-bootstrap';

function Listings() {
  const [listings, setListings] = useState([]);
  const [books, setBooks] = useState({});
  const [places, setPlaces] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newListingData, setNewListingData] = useState({
    book: '',
    condition: '',
    price: '',
    pickup: '',
    createdBy: '65f5d1a809170c47ce1f24a0', // Default createdBy
    purchasedBy: '65f5d1a809170c47ce1f24a0', // Assuming this is not needed for new listings
    purchased: false,
  });
  const [filters, setFilters] = useState({
    book: [],
    condition: [],
    pickup: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    book: [],
    condition: [],
    pickup: [],
  });

  useEffect(() => {
    fetchListings();
    fetchAllBooks();
    fetchAllPlaces();
  }, [appliedFilters, sortBy, searchQuery]);

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
      console.log(books['65f848bb0adbdf52882ddecb']);
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
      
      // Extracting just the names from the fetched data
      const places = data.map(place => place.name);
      
      // Assuming setPlaces is a function to set the state of places
      setPlaces(places);
      
      console.log(places);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: checked ? [...prevFilters[name], value] : prevFilters[name].filter(item => item !== value)
      }));
    } else {
      setNewListingData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortListings = (listings) => {
    switch (sortBy) {
      case 'priceLowToHigh':
        return listings.sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return listings.sort((a, b) => b.price - a.price);
      default:
        return listings;
    }
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleCreateListing = async () => {
    try {
      console.log(JSON.stringify(newListingData))
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
        pickup: '',
        createdBy: '65f5d1a809170c47ce1f24a0',
        purchasedBy: '65f5d1a809170c47ce1f24a0',
        purchased: false,
      });
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
      let filteredListings = data.filter(listing => !listing.purchased);
      filteredListings = applyFilters(filteredListings);
      setListings(filteredListings);
      fetchBookTitles(filteredListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };


  
  const applyFilters = (listings) => {
    return listings.filter(listing => {
      return (
        (appliedFilters.book.length === 0 || appliedFilters.book.includes(listing.book._id)) &&
        (appliedFilters.condition.length === 0 || appliedFilters.condition.includes(listing.condition)) &&
        (appliedFilters.pickup.length === 0 || appliedFilters.pickup.includes(listing.pickup))
      );
    });
  };


  

  const fetchBookTitles = async (listings) => {
    const bookIds = listings.map(listing => listing.book);
    try {
      const promises = bookIds.map(bookId =>
        fetch(`http://localhost:8082/api/books/${bookId}`)
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

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filterListingsBySearch = (listings) => {
    const filteredListings = listings.filter(listing => {
      const bookTitles = Object.values(books); 
      const bookId = listing.book.toString(); 
      const bookTitle = bookTitles.find(title => title.toLowerCase().includes(searchQuery.toLowerCase()));
      return bookTitle;
    });
  
    // Sort the filtered listings
    const sortedListings = sortListings(filteredListings);
  
    return sortedListings;
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
      pickup: '',
      createdBy: '65f5d1a809170c47ce1f24a0',
      purchasedBy: '',
      purchased: false,
    });
  };

  const handleInformationClick = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/books/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      const data = await response.json();
      setSelectedBook(data);
      setShowInfoModal(true);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };
  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setSelectedBook(null);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          {/* Filter panel */}
          <div className="p-3 bg-light">
            <h4>Filters</h4>
            <Form>
              <Form.Group controlId="bookFilter">
                <Form.Label>Filter by Book:</Form.Label>
                {Object.keys(books).map(bookId => (
                  <Form.Check
                    key={bookId}
                    type="checkbox"
                    label={books[bookId]}
                    name="book"
                    value={bookId}
                    onChange={handleInputChange}
                  />
                ))}
              </Form.Group>
              <Form.Group controlId="conditionFilter">
                <Form.Label>Filter by Condition:</Form.Label>
                {['New', 'Good', 'Okay', 'Poor', 'Damaged'].map(condition => (
                  <Form.Check
                    key={condition}
                    type="checkbox"
                    label={condition}
                    name="condition"
                    value={condition}
                    onChange={handleInputChange}
                  />
                ))}
              </Form.Group>
              <Form.Group controlId="pickupFilter">
                <Form.Label>Filter by Pickup Location:</Form.Label>
                {/* Assuming you have pickup locations stored in the 'places' state */}
                {Object.keys(places).map(placeId => (
                  <Form.Check
                    key={placeId}
                    type="checkbox"
                    label={places[placeId]}
                    name="pickup"
                    value={placeId}
                    onChange={handleInputChange}
                  />
                ))}
              </Form.Group>

              
              <Button variant="primary" onClick={handleApplyFilters}>Apply Filters</Button>
            </Form>
            <Form.Group controlId="sortBy">
              <Form.Label>Sort By:</Form.Label>
              <Form.Control as="select" value={sortBy} onChange={handleSortByChange}>
                <option value="">Select</option>
                <option value="priceLowToHigh">Price Low to High</option>
                <option value="priceHighToLow">Price High to Low</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="search">
                <Form.Label>Search by Book Title:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter book title" 
                  value={searchQuery} 
                  onChange={handleSearchInputChange} 
                />
              </Form.Group>

            
          </div>
        </Col>
        <Col md={9}>
          {/* Listings */}
          <Row xs={1} md={2} lg={3} className="g-4">
            {filterListingsBySearch(listings).map(listing => (
              <Col key={listing._id}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={listing.book.image} />
                  <Card.Body>
                    <Card.Title>{books[listing.book]}</Card.Title>
                    <Card.Text>
                      Condition: {listing.condition}<br />
                      Price: {listing.price}<br />
                      Pickup Location: {listing.pickup}<br />
                      Purchased: {listing.purchased ? 'Yes' : 'No'}<br />
                    </Card.Text>
                    {!listing.purchased && (
                      <>
                        <Button variant="primary" onClick={() => handleInformationClick(listing.book)}>Information</Button>
                        {' '}
                        <Button variant="success" onClick={() => handlePurchaseClick(listing._id, listing.price, books[listing.book])}>Purchase</Button>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modals */}
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
      <Form.Group controlId="formBook">
        <Form.Label>Book</Form.Label>
        <Form.Control 
          as="select" 
          name="book" 
          value={newListingData.book} 
          onChange={handleInputChange}
        >
          <option value="">Select Book</option>
          {Object.keys(books).map(bookId => (
            <option key={bookId} value={bookId}>{books[bookId]}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formCondition">
        <Form.Label>Condition</Form.Label>
        <Form.Control 
          as="select" 
          name="condition" 
          value={newListingData.condition} 
          onChange={handleInputChange}
        >
          <option value="">Select Condition</option>
          {['New', 'Good', 'Okay', 'Poor', 'Damaged'].map(condition => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control 
          type="number" 
          name="price" 
          value={newListingData.price} 
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formPickup">
        <Form.Label>Pickup Location</Form.Label>
        <Form.Control 
          as="select" 
          name="pickup" 
          value={newListingData.pickup} 
          onChange={handleInputChange}
        >
          <option value="">Select Pickup Location</option>
          {Object.keys(places).map(placeId => (
            <option key={placeId} value={placeId}>{places[placeId]}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseCreateModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handleCreateListing}>
      Create Listing
    </Button>
  </Modal.Footer>
</Modal>


      {/* Create New Listing Button */}
      <Button variant="success" onClick={handleCreateListingClick}>Create New Listing</Button>
    </Container>
  );
}

export default Listings;
