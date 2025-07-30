import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import InstructorNav from './instructornav';

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
          date: foundClass.date?.split('T')[0], // strip time from ISO date
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

  // Handle form input changes
  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit updated class info
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
    
    <Container className="mt-5">
      <h2>Edit Class</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="className">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="duration">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price (₹)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
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

        <Button variant="primary" type="submit" className="mt-3">
          Update Class
        </Button>
      </Form>
    </Container>
  );
};

export default EditClass;
