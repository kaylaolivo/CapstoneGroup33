// /pages/places.js

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing Pages
import NewPlace from '../places/pages/NewPlace';
import UserPlaces from '../places/pages/UserPlaces';
import UpdatePlace from '../places/pages/UpdatePlace';


// Places component (main page)
const Places = () => {
  return (
    <Router>
      <div>


        {/* Routes for sub-pages */}
        <Route path="/places/new" component={NewPlace} />
        <Route path="/places/update" component={UpdatePlace} />
        <Route path="/places/user" component={UserPlaces} />
      </div>
    </Router>
  );
};

export default Places;
