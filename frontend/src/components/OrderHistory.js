import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Layout from './Layout';

const OrderHistoryPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [bookTitles, setBookTitles] = useState({});
  const user = {
    _id: "65f5d1a809170c47ce1f24a0",
    username: "114998879432803324810",
    name: "KAYLA OLIVO",
    googleId: "114998879432803324810",
    __v: 0,
    grad_year: 2024,
    major: "Electrical and Computer Engineering"
  };

  useEffect(() => {
    fetchPurchases();
    fetchSales();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await fetch('http://localhost:8082/api/listings/all');
      const data = await res.json();
      setPurchases(data.filter(listing => listing.purchasedBy === user._id));
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const fetchSales = async () => {
    try {
      const res = await fetch(`http://localhost:8082/api/listings/createdBy/${user._id}`);
      const data = await res.json();
      setSales(data);
      const bookIds = data.map(sale => sale.book);
      const fetchedTitles = await Promise.all(bookIds.map(fetchBookInfo));
      const titlesObject = {};
      bookIds.forEach((id, index) => {
        titlesObject[id] = fetchedTitles[index];
      });
      setBookTitles(titlesObject);
    } catch (error) {
      console.error('Error fetching sales:', error);
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

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2>My Purchases</h2>
            <div className="card-columns">
              {purchases.map(purchase => (
                <Card key={purchase._id}>
                  <Card.Body>
                    {/* Display purchase details here */}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <h2>My Listings</h2>
            <div className="card-columns">
              {sales.map(sale => (
                <Card key={sale._id}>
                  <Card.Body>
                    <h5 className="card-title">{bookTitles[sale.book]}</h5>
                    <p className="card-text">Condition: {sale.condition}</p>
                    <p className="card-text">Price: {sale.price}</p>
                    <p className="card-text">Pickup: {sale.pickup}</p>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistoryPage;
