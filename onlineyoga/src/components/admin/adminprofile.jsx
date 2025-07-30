import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // ✅ Profile icon
import AdminNavbar from './adminnav';

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9001/api/admin/profile`)
      .then(res => setAdmin(res.data))
      .catch(err => console.error("Error loading admin profile:", err));
  }, []);

  return (
    <>
    <AdminNavbar/>
    <Container className="mt-5">
      <h2 className="mb-4">Admin Profile</h2>
      {admin ? (
        <Card className="text-center p-4 shadow-sm">
          <FaUserCircle size={80} color="#6c757d" className="mb-3 mx-auto" />
          <Card.Body>
            <Card.Title>Admin Info</Card.Title>
            <Card.Text><strong>Email:</strong> {admin.email}</Card.Text>
            <Card.Text><strong>Role:</strong> {admin.role}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading profile...</p>
      )}
    </Container>
    </>
  );
};

export default AdminProfile;
