import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import InstructorNav from './instructornav';
import './instructorNav.css'; // ✅ for sidebar & background

const EditClass = () => {
  const { id } = useParams(); // class ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    className: '',
    date: '',
    time: '',
    duration: '',
    description: '',
    price: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch existing class details
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:9001/api/instructor/myclasses`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const foundClass = res.data.find(cls => cls._id === id);
        if (!foundClass) {
          setError('Class not found');
          return;
        }

        setFormData({
          className: foundClass.className,
          date: foundClass.date?.split('T')[0], // format ISO date
          time: foundClass.time,
          duration: foundClass.duration,
          description: foundClass.description,
          price: foundClass.price
        });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch class details');
      }
    };

    fetchClass();
  }, [id]);

  // Handle input changes
  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit update
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:9001/api/instructor/updateclass/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Class updated successfully!');
      setTimeout(() => navigate('/instructor/myclasses'), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Update failed');
    }
  };

  return (
    <div className="instructor-dashboard-wrapper">
      {/* Sidebar */}
      <InstructorNav />

      {/* Main Content */}
      <div className="instructor-content">
        <Container style={{ maxWidth: '720px', padding: '40px 20px' }}>
          <Card
            className="shadow-lg p-4"
            style={{
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            <h3 className="text-center text-primary fw-bold mb-4">✏️ Edit Class</h3>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="className" className="mb-3">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="date" className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="time" className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="duration" className="mb-3">
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="price" className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="description" className="mb-4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 fw-bold">
                Update Class
              </Button>
            </Form>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default EditClass;
