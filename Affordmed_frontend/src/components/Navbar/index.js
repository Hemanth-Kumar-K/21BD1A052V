import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import companyLogo from '../../assests/companylogo.png';
import "./index.css"

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
        <img
          src={companyLogo}
          height="40"
          className="d-inline-block align-top navbar-brand-logo"
          alt="Company Logo"
        />
        <span className="navbar-brand-name">ShopLift</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/products">All Products</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
