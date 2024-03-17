import React from 'react';
import './account.css'; // Import the CSS file for styling

const Account = () => {
  return (
    <div className="account-page">
      <div className="side-panel active">
        <a href="information.html">Information</a>
        <a href="logout.html">Logout</a>
        <a href="order_history.html">Order History</a>
      </div>
      <div className="content">
        <h2>Account Page</h2>
      </div>
    </div>
  );
}

export default Account;
