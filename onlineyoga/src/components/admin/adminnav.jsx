import React from 'react';
import { FaUser, FaChartBar, FaUsers, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './adminNav.css';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    navigate("/");
  };

  return (
    <div className="admin-sidebar">
      <h5>ADMIN PANEL</h5>
      <Nav className="flex-column w-100">
        <Nav.Link href="/admin/home" className="admin-nav-link">
          <FaHome className="admin-nav-icon" /> Home
        </Nav.Link>
        <Nav.Link href="/admin/manageusers" className="admin-nav-link">
          <FaUsers className="admin-nav-icon" /> Manage Users
        </Nav.Link>
        <Nav.Link href="/admin/reports" className="admin-nav-link">
          <FaChartBar className="admin-nav-icon" /> Reports
        </Nav.Link>
        <Nav.Link href="/admin/profile" className="admin-nav-link">
          <FaUser className="admin-nav-icon" /> Profile
        </Nav.Link>
        <Nav.Link onClick={handleLogout} className="admin-nav-link">
          <FaSignOutAlt className="admin-nav-icon" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
}
