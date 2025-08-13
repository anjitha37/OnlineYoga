import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Badge, Card } from 'react-bootstrap';
import InstructorNav from './instructornav';
import { useNavigate } from 'react-router-dom';
import './instructorNav.css';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const fetchMyClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:9001/api/instructor/myclasses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setClasses(res.data);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    }
  };

  useEffect(() => {
    fetchMyClasses();
  }, []);

  const handleEdit = (classId) => {
    navigate(`/instructor/editclass/${classId}`);
  };

  return (
    <div className="instructor-dashboard-wrapper">
      <InstructorNav />
      <div className="instructor-content">
        <Container style={{ maxWidth: '1200px', padding: '40px 20px' }}>
          <Card className="shadow-lg p-4 border-0 rounded-4 glass-card" style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)'
          }}>
            <h3 className="text-center mb-4 text-primary fw-bold">📚 My Yoga Classes</h3>
            {classes.length === 0 ? (
              <p className="text-center text-muted">You haven't added any classes yet.</p>
            ) : (
              <Table striped bordered hover responsive className="table-light rounded shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>Class Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls) => (
                    <tr key={cls._id}>
                      <td>{cls.className}</td>
                      <td>{new Date(cls.date).toLocaleDateString('en-IN')}</td>
                      <td>{cls.time}</td>
                      <td>{cls.duration} mins</td>
                      <td><strong>₹{cls.price}</strong></td>
                      <td>
                        <Badge bg="success">Active</Badge>
                      </td>
                      <td className="text-center">
                        <Button
                          variant="outline-warning"
                          onClick={() => handleEdit(cls._id)}
                          size="sm"
                        >
                          ✏️ Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default MyClasses;
