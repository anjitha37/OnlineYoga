import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import AdminNavbar from './adminnav';
import { StoreContext } from '../../context/StoreContext';  // ✅ Import context
import './adminNav.css';

const AdminProfile = () => {
  const { url } = useContext(StoreContext); // ✅ get backend URL from context
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${url}/api/admin/profile`) // ✅ using context URL
      .then((res) => {
        setAdmin(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading admin profile:", err);
        setError("Failed to load admin profile");
        setLoading(false);
      });
  }, [url]);

  return (
    <div className="admin-dashboard-wrapper">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="admin-content" style={{ flexDirection: 'column', padding: '20px', overflowY: 'auto' }}>
        <Container>
          <h2 className="mb-4 text-center">👤 Admin Profile</h2>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading profile...</p>
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">{error}</Alert>
          ) : admin ? (
            <Card className="text-center p-4 shadow-sm mx-auto" style={{ maxWidth: '500px', borderRadius: '16px' }}>
              <FaUserCircle size={80} color="#6c757d" className="mb-3 mx-auto" />
              <Card.Body>
                <Card.Title className="mb-3">{admin.fullname || "Admin"}</Card.Title>
                <Card.Text><strong>Email:</strong> {admin.email}</Card.Text>
                <Card.Text><strong>Role:</strong> {admin.role}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-center text-muted">No profile data found.</p>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AdminProfile;
