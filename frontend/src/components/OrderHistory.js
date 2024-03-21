import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Layout from './Layout';

const OrderHistoryPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
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
      // Simulating fetching purchases
      const res = await fetch('http://localhost:8082/api/listings/all'); // Assuming this route returns all listings
      const data = await res.json();
      setPurchases(data.filter(listing => listing.purchasedBy === user._id)); // Filter by user's _id
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const fetchSales = async () => {
    try {
      // Simulating fetching sales
      const res = await fetch(`http://localhost:8082/api/listings/createdBy/${user._id}`); // Assuming this route returns listings created by a specific user
      const data = await res.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
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
          <h2>My Sales</h2>
          <div className="card-columns">
            {sales.map(sale => (
              <Card key={sale._id}>
                <Card.Body>
                  {/* Display sale details here */}
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
