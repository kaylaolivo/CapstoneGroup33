import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Places.css'; 

// Importing Pages
import NewPlace from '../places/pages/NewPlace';
import UserPlaces from '../places/pages/UserPlaces';
import UpdatePlace from '../places/pages/UpdatePlace';

const Places = () => {
  return (
    <Router>
      <div className="router-container">
        <div className="link-container">
          <Link to="/places/new">New Place</Link>
          <Link to="/places/update">Update Place</Link>
          <Link to="/places/user">User Places</Link>
        </div>

        {/* Routes for sub-pages */}
        <Route path="/places/new" component={NewPlace} />
        <Route path="/places/update" component={UpdatePlace} />
        <Route path="/places/user" component={UserPlaces} />
      </div>
    </Router>
  );
};

export default Places;
