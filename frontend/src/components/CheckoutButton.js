import React from 'react';
import Button from 'react-bootstrap/Button';

const CheckoutButton = () => {
  const handleCheckout = () => {
    fetch('http://localhost:8082/create-checkout-session', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
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
  };

  return (
    <Button variant="primary" onClick={handleCheckout}>
      Checkout
    </Button>
  );
};

export default CheckoutButton;
