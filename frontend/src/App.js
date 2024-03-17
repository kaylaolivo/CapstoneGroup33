
// App.js

import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Importing Components
import Courses from './components/Courses';
import Account from './components/Account'
import Textbooks from './components/Textbooks';
import Places from './pages/Places'; // Updated import for Places
import Information from './components/Information';
import Listings from './components/Listings';
import OrderHistoryPage from './components/OrderHistory';
import GoogleSignInButton from './components/GoogleSignInButton';

// Dummy User Object
const user = {
  _id: "65f5d1a809170c47ce1f24a0",
  username: "114998879432803324810",
  name: "KAYLA OLIVO",
  googleId: "114998879432803324810",
  __v: 0,
  grad_year: 2024,
  major: "65f5d00ec9a54a449c015d97"
};

const AppNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">RU Exchange Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
            <Nav.Link as={Link} to="/account">Account</Nav.Link>
            <Nav.Link as={Link} to="/textbooks">Textbooks</Nav.Link>
            <Nav.Link as ={Link} to="/listings">Listings</Nav.Link>
            <NavDropdown title="Places" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/places/new">NewPlace</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/places/update">UpdatePlace</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/places/user">UserPlaces</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};




// Main App component
const App = () => {

  return (

    <Router>
      <div>
        {/* Navbar */}
        <AppNavbar />
        <Routes>
        {/* Routes */}
          <Route path="/courses" element={<Courses/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/textbooks" element={<Textbooks/>} />
          <Route path="/places" element={<Places/>} />
          <Route path="/information" element={<Information />}/>
          <Route path="/listings" element={<Listings />}/>
          <Route path="/order_history" element={<OrderHistoryPage />}/>
          <Route path="/" element={<GoogleSignInButton user={user}/>}/>

        </Routes>


        

      </div>
    </Router>
  );
};

export default App;