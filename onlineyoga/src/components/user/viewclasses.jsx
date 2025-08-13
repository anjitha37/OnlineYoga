import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserNav from './usernav';
import { FaClock, FaCalendarAlt, FaRupeeSign, FaUser } from 'react-icons/fa';
import './UserNav.css';

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9001/api/user/classes")
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  const filteredClasses = classes.filter(c =>
    c.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAndPay = (classId) => {
    navigate(`/payment/${classId}`);
  };

  return (
    <div className="user-dashboard-wrapper">
      {/* Sidebar navigation */}
      <div className="user-sidebar">
        <UserNav />
      </div>

      {/* Main content */}
      <div className="user-content">
        <div style={{
          
          flex: 1,                // Fill remaining height
          padding: '40px 0',
          overflowY: 'auto'       // Allows scroll inside content if needed
        }}>
          <Container>
            <h2 className="text-center mb-4">🧘 Available Yoga Classes</h2>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="🔍 Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>

            <Row className="justify-content-center">
              {filteredClasses.length === 0 ? (
                <p className="text-center">No classes found.</p>
              ) : (
                filteredClasses.map((yogaClass) => (
                  <Col key={yogaClass._id} md={6} lg={4} className="mb-4">
                    <Card
                      className="shadow-sm h-100"
                      style={{ transition: 'transform 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Card.Body>
                        <Card.Title className="mb-3">{yogaClass.className}</Card.Title>
                        <Card.Text>
                          <FaCalendarAlt className="me-2" /> <strong>Date:</strong> {new Date(yogaClass.date).toLocaleDateString('en-IN')}
                        </Card.Text>
                        <Card.Text>
                          <FaClock className="me-2" /> <strong>Time:</strong> {yogaClass.time}
                        </Card.Text>
                        <Card.Text>
                          <strong>Duration:</strong> {yogaClass.duration} mins
                        </Card.Text>
                        <Card.Text>
                          <FaUser className="me-2" /><strong>Instructor:</strong> {yogaClass.instructorId?.fullname || "N/A"}
                        </Card.Text>
                        <Card.Text>{yogaClass.description || "No description provided."}</Card.Text>
                        <Card.Text>
                          <FaRupeeSign className="me-1" /><strong>Price:</strong> ₹{yogaClass.price}
                        </Card.Text>

                        <div className="d-grid">
                          <Button variant="primary" onClick={() => handleBookAndPay(yogaClass._id)}>
                            Book & Pay
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ViewClasses;
