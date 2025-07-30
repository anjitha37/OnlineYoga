import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const navigate=useNavigate();
  const handleLogout = () => {
    // ✅ Clear token or admin data
    localStorage.removeItem("adminToken"); // Or whatever key you used
    localStorage.removeItem("adminId");
    // ✅ Redirect to homepage
    navigate("/");
  };

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1050,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(to right,rgb(218, 155, 116),rgb(48, 100, 109))',
    padding: '10px 20px',
    height: '60px',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    width: '100%',
  };

  const brandStyle = {
    fontWeight: 'bold',
    fontSize: '1.4rem',
    letterSpacing: '1px',
    color: '#1f1f1f',
    marginRight: '30px',
    textDecoration: 'none',
  };

  const navCollapseStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
  };

  const navGroupStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  };

  const navLinkStyle = {
    color: '#f5f5f5',
    fontWeight: 500,
    padding: '8px 12px',
    textDecoration: 'none',
  };

  return (
    <>
      <Navbar bg="blue" variant=" blue" expand="lg" style={navbarStyle}>
        <Container style={containerStyle}>
          <Navbar.Brand href="/adminhome" style={brandStyle}>
            ONLINE YOGA ADMIN
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav" style={navCollapseStyle}>
            <Nav className="me-auto" style={navGroupStyle}>
              <Nav.Link href="/admin/manageusers" style={navLinkStyle}>
                Manage Users
              </Nav.Link>
              {/* <Nav.Link href="/admin/manageinstructors" style={navLinkStyle}>
                Manage Instructors
              </Nav.Link> */}
              {/* <Nav.Link href="/admin/sessions" style={navLinkStyle}>
                Yoga Sessions
              </Nav.Link> */}
              <Nav.Link href="/admin/reports" style={navLinkStyle}>
                Reports
              </Nav.Link>
            </Nav>
            <Nav style={navGroupStyle}>
              <Nav.Link href="/admin/profile" style={navLinkStyle}>
                Profile
              </Nav.Link>
              <Nav.Link onClick={handleLogout} style={navLinkStyle}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Padding to prevent overlap with fixed navbar */}
      <div style={{ paddingTop: '60px' }} />
    </>
  );
}

export default AdminNavbar;
