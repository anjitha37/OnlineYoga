import React, { useState } from 'react';
import InstructorNav from './instructornav';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import './instructorNav.css'; // ✅ to get sidebar + content styling

export default function AddClasses() {
  const [formData, setFormData] = useState({
    className: '',
    date: '',
    time: '',
    duration: '',
    description: '',
    price: '',
    meetingLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    if (!formData.className.trim()) return "Class name is required";
    if (!formData.date) return "Date is required";
    if (!formData.time) return "Time is required";
    if (!formData.duration || Number(formData.duration) <= 0) return "Duration must be positive";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.price || Number(formData.price) <= 0) return "Price must be greater than 0";
    if (formData.meetingLink) {
      const urlPattern = /^(https?:\/\/)?(meet\.google\.com|zoom\.us|[\w-]+\.[\w.-]+)(\/\S*)?$/;
      if (!urlPattern.test(formData.meetingLink)) {
        return "Please enter a valid Zoom or Google Meet URL";
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:9001/api/instructor/addclass',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Class added successfully!');
      setFormData({
        className: '',
        date: '',
        time: '',
        duration: '',
        description: '',
        price: '',
        meetingLink: ''
      });
    } catch (error) {
      console.error('Failed to add class:', error);
      alert(error.response?.data?.msg || 'Failed to add class');
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
            <h3 className="text-center text-primary fw-bold mb-4">
              📅 Add New Yoga Class
            </h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="className" className="mb-3">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  placeholder="Enter class name"
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
                  placeholder="e.g., 60"
                  required
                  min="1"
                />
              </Form.Group>
              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short description about the class"
                  required
                />
              </Form.Group>
              <Form.Group controlId="price" className="mb-3">
                <Form.Label>Price (INR)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter class price"
                  required
                  min="1"
                  step="0.01"
                />
              </Form.Group>
              <Form.Group controlId="meetingLink" className="mb-4">
                <Form.Label>Meeting Link (Zoom/Google Meet)</Form.Label>
                <Form.Control
                  type="url"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleChange}
                  placeholder="Paste Zoom/Google Meet link here"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 fw-bold">
                ➕ Add Class
              </Button>
            </Form>
          </Card>
        </Container>
      </div>
    </div>
  );
}
