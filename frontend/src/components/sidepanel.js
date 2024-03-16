// SidePanel.js

import React from 'react';
import { Link } from 'react-router-dom';
import './SidePanel.css';
const SidePanel = () => {
  return (
    <div className="side-panel">
      <ul>
        <li><Link to="/account/information">Information</Link></li>
        <li><Link to="/account/order-history">Order History</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
};

export default SidePanel;
