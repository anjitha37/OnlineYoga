import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaPlusCircle, FaList, FaCalendarCheck, FaStar, FaMoneyBill, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './instructorNav.css';

export default function InstructorNav() {
  const instructorId = localStorage.getItem("instructorId");

  return (
    <div className="instructor-sidebar">
      <h5>INSTRUCTOR PANEL</h5>
      <Nav className="flex-column w-100">
        <Nav.Link href="/instructor/addclasses" className="instructor-nav-link">
          <FaPlusCircle className="instructor-nav-icon" /> Add Classes
        </Nav.Link>
        <Nav.Link href="/instructor/myclasses" className="instructor-nav-link">
          <FaList className="instructor-nav-icon" /> My Classes
        </Nav.Link>
        <Nav.Link href="/instructor/bookings" className="instructor-nav-link">
          <FaCalendarCheck className="instructor-nav-icon" /> Manage Bookings
        </Nav.Link>
        <Nav.Link href="/instructor/reviews" className="instructor-nav-link">
          <FaStar className="instructor-nav-icon" /> Reviews
        </Nav.Link>
        <Nav.Link href={`/instructor/earnings/${instructorId}`} className="instructor-nav-link">
          <FaMoneyBill className="instructor-nav-icon" /> Earnings
        </Nav.Link>
        <Nav.Link href="/instructor/profile" className="instructor-nav-link">
          <FaUser className="instructor-nav-icon" /> Profile
        </Nav.Link>
        <Nav.Link href="/logout" className="instructor-nav-link">
          <FaSignOutAlt className="instructor-nav-icon" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
}
