import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaChalkboardTeacher, FaBook, FaStar, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './UserNav.css'; // Correctly imported new CSS file

function UserNav() {
  return (
    <>
      <div className="user-sidebar">
        <h5>USER DASHBOARD</h5>
        <Nav defaultActiveKey="/userhome" className="flex-column">
          <Nav.Link href="/userhome" className="user-nav-link">
            <FaHome className="user-nav-icon" /> Home
          </Nav.Link>
          <Nav.Link href="/user/classes" className="user-nav-link">
            <FaChalkboardTeacher className="user-nav-icon" /> View Classes
          </Nav.Link>
          <Nav.Link href="/user/bookings" className="user-nav-link">
            <FaBook className="user-nav-icon" /> My Bookings
          </Nav.Link>
          <Nav.Link href="/user/reviews" className="user-nav-link">
            <FaStar className="user-nav-icon" /> My Reviews
          </Nav.Link>
          <Nav.Link href="/user/profile" className="user-nav-link">
            <FaUser className="user-nav-icon" /> Profile
          </Nav.Link>
          <Nav.Link href="/logout" className="user-nav-link">
            <FaSignOutAlt className="user-nav-icon" /> Logout
          </Nav.Link>
        </Nav>
      </div>

      {/* Content padding */}
      <div className="user-content">
        {/* Your page content will go here */}
      </div>
    </>
  );
}

export default UserNav;
