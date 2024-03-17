// Layout component
import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; // CSS file for layout styling

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="side-panel">
        <Link to="/information">Information</Link>
        <Link to="/">Logout</Link>
        <Link to="/order_history">Order History</Link>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
