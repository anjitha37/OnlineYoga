import React, { useEffect, useState, useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { FaUserTie } from 'react-icons/fa';
import InstructorNav from './instructornav';
import './instructorNav.css';
import { StoreContext } from "../../context/StoreContext"; // ✅ import

const InstructorProfile = () => {
  const { url } = useContext(StoreContext); // ✅
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructorProfile = async () => {
      try {
        const instructorId = localStorage.getItem("userId");
        if (!instructorId) return setError("No instructor ID found. Please log in again.");
        if (instructorId.length < 24) return setError("Invalid instructor ID format.");

        const response = await axios.get(`${url}/api/user/profile/${instructorId}`);
        setInstructor(response.data);
      } catch (err) {
        setError("Failed to fetch instructor profile");
      } finally {
        setLoading(false);
      }
    };
    fetchInstructorProfile();
  }, [url]);

  return (
    <div className="instructor-dashboard-wrapper">
      {/* Sidebar */}
      <InstructorNav />

      {/* Main Content */}
      <div className="instructor-content">
        <Container style={{ maxWidth: '700px', padding: '40px 20px' }}>
          <h2 className="text-center mb-4 text-primary fw-bold">Instructor Profile</h2>

          {loading ? (
            <div className="text-center">Loading profile...</div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : instructor ? (
            <Card className="p-4 shadow-lg text-center border-0 rounded-4 bg-white" style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(255,255,255,0.9)' }}>
              <FaUserTie size={80} color="#0d6efd" className="mb-3" />
              <Card.Body>
                <Card.Title className="fw-bold">{instructor.fullname}</Card.Title>
                <hr />
                <Card.Text><strong>Email:</strong> {instructor.email}</Card.Text>
                <Card.Text><strong>Phone:</strong> {instructor.phone}</Card.Text>
                <Card.Text><strong>Age:</strong> {instructor.age}</Card.Text>
                <Card.Text><strong>Gender:</strong> {instructor.gender}</Card.Text>
                <Card.Text><strong>Experience:</strong> {instructor.experience || "N/A"}</Card.Text>
                <Card.Text><strong>Role:</strong> {instructor.role}</Card.Text>
                <Card.Text>
                  <strong>Certificate:</strong>{' '}
                  {instructor.certificate ? (
                    <a
                      href={`http://localhost:9001/uploads/${instructor.certificate}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-underline text-primary"
                    >
                      View Certificate
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </Card.Text>
                <Card.Text>
                  <strong>Approval Status:</strong>{' '}
                  <span className={instructor.isApproved ? "text-success" : "text-warning"}>
                    {instructor.isApproved ? "Approved" : "Pending"}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-center">No instructor data available.</p>
          )}
        </Container>
      </div>
    </div>
  );
};

export default InstructorProfile;
