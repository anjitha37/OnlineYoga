import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function UserNav() {
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1050,
    background: 'linear-gradient(to right,rgb(228, 140, 99), #307C85)',
    boxShadow: '0 4px 10px rgba(230, 51, 140, 0.2)',
    height: '60px',
    display: 'grid',
    alignItems: 'center',
  };

  const navLinkStyle = {
    color: '#fff',
    fontWeight: 500,
    padding: '8px 12px',
    textDecoration: 'none',
  };

  return (
    <>
      <Navbar expand="lg" style={navbarStyle}>
        <Container>
          <Navbar.Brand href="/user/home" style={{ color: "#fff", fontWeight: "bold" }}>
            YOGA USER DASHBOARD
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="user-navbar-nav" />
          <Navbar.Collapse id="user-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/user/classes" style={navLinkStyle}>View Classes</Nav.Link>
              {/* <Nav.Link href="/user/live" style={navLinkStyle}>Live Classes</Nav.Link> */}
              {/* <Nav.Link href="/user/videos" style={navLinkStyle}>On-Demand Videos</Nav.Link> */}
              <Nav.Link href="/user/bookings" style={navLinkStyle}>My Bookings</Nav.Link>
              <Nav.Link href="/user/reviews" style={navLinkStyle}>My Reviews</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/user/profile" style={navLinkStyle}>Profile</Nav.Link>
              <Nav.Link href="/logout" style={navLinkStyle}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Prevent content overlap */}
      <div style={{ paddingTop: '60px' }} />
    </>
  );
}

export default UserNav;
