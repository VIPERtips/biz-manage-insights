import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      bg="light" 
      expand="lg" 
      className={`py-3 sticky-top ${isScrolled ? 'scrolled-nav' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-medium text-primary fs-3">
          <img 
            alt='Logo Icon' 
            src="/logo.svg" 
            className="me-2 h-12 w-auto" 
            style={{ width: '40px', height: '40px' }} 
          />
          BizManage Insights
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-hover">Home</Nav.Link>
            {/*<Nav.Link as={Link} to="/about" className="nav-link-hover">About</Nav.Link>/*}

            {/* Resources Dropdown */}
            <NavDropdown 
              title="Resources" 
              id="resources-dropdown"
              className="nav-link-hover"
            >
              <NavDropdown.Item as={Link} to="/blog">Blog</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/case-studies">Case Studies</NavDropdown.Item>
              <NavDropdown.Item disabled>Resources</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/contact" className="nav-link-hover">Contact</Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link-hover">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;