import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './Logout';

function Navigation () {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">BigBrain</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/join">Join Game</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Logout />
    </Navbar>
  );
}

export default Navigation;
