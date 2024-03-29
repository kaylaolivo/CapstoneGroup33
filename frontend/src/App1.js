
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
import Account from './components/Account';
import Textbooks from './components/Textbooks';
import Places from './pages/NewPlace'; // Updated import for Places
//import Login from './components/Login';
import GoogleSignInButton from './components/GoogleSignInButton';

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
          <Route path="/courses" component={Courses} />
          <Route path="/account" component={Account} />
          <Route path="/textbooks" component={Textbooks} />
          <Route path="/places" component={Places} />
          <Route path="/" component={GoogleSignInButton}/>

        </Routes>


        

      </div>
    </Router>
  );
};

export default App;

