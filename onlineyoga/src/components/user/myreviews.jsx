import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table, Alert, Card } from 'react-bootstrap';
import UserNav from './usernav';
import { FaStar } from 'react-icons/fa';
import { StoreContext } from '../../context/StoreContext';
import './UserNav.css';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]);
  const [form, setForm] = useState({ classId: '', rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(null);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const { url } = useContext(StoreContext);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const res = await axios.get(`${url}/api/user/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBookedClasses = async () => {
      try {
        const res = await axios.get(`${url}/api/user/bookings/user/${userId}/classes`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookedClasses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (userId && token) {
      fetchMyReviews();
      fetchBookedClasses();
    }
  }, [userId, token, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.classId || form.rating < 1) {
      setMessage('Please select a class and provide a rating.');
      return;
    }

    try {
      await axios.post(`${url}/api/user/reviews`, { ...form, userId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Review submitted successfully!');
      setForm({ classId: '', rating: 0, comment: '' });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || 'Failed to submit review');
    }
  };

  return (
    <div className="user-dashboard-wrapper">
      <div className="user-sidebar"><UserNav /></div>
      <div className="user-content" style={{ padding: '20px' }}>
        <Container fluid>
          <h3 className="mb-4 text-center">📝 Share Your Review</h3>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><strong>Select Class</strong></Form.Label>
              <Form.Select value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })} required>
                <option value="">-- Select a class you booked --</option>
                {bookedClasses.map((cls) => (
                  <option key={cls._id} value={cls._id}>{cls.className} ({new Date(cls.date).toLocaleDateString()})</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Card className="p-3 mb-3">
              <Form.Label><strong>Rating</strong></Form.Label>
              <div style={{ fontSize: '1.8rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star}
                    onClick={() => setForm({ ...form, rating: star })}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    color={(hoverRating || form.rating) >= star ? '#ffc107' : '#e4e5e9'}
                    style={{ cursor: 'pointer', marginRight: 5 }}
                  />
                ))}
              </div>
            </Card>

            <Form.Group className="mb-3">
              <Form.Label><strong>Comment</strong></Form.Label>
              <Form.Control as="textarea" rows={3} value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Share your thoughts..."
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit">Submit Review</Button>
            </div>
          </Form>

          <Card className="p-4 shadow-sm bg-white rounded mt-4">
            <h5 className="mb-3 text-center">⭐ Your Submitted Reviews</h5>
            {reviews.length === 0 ? (
              <p className="text-muted text-center">No reviews submitted yet.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr><th>Class Name</th><th>Rating</th><th>Comment</th></tr>
                </thead>
                <tbody>
                  {reviews.map((rev) => (
                    <tr key={rev._id}>
                      <td>{rev.classId?.className || rev.classId}</td>
                      <td>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FaStar key={i} color={i <= rev.rating ? '#ffc107' : '#e4e5e9'} />
                        ))}
                      </td>
                      <td>{rev.comment}</td>
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

export default MyReviews;
