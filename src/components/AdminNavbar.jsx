import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const handleLogout = () => {
  localStorage.clear();
  window.location.href = '/login';
};

const AdminNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Container>
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="#add" >Add Case Study</Nav.Link>
            <Nav.Link as={Link} to="#manage">Manage Case Studies</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
