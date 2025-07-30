
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Badge, Spinner } from 'react-bootstrap';
import UserNav from './usernav';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9001/api/user/bookings/${userId}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await axios.put(`http://localhost:9001/api/user/cancel/${bookingId}`);
      fetchBookings(); // Refresh
    } catch (err) {
      console.error("Error cancelling", err);
    }
  };

  useEffect(() => {
    if (userId) fetchBookings();
  }, [userId]);

  const getBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'cancelled': return 'danger';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <>
      <UserNav />
      <Container className="mt-5">
        <h3 className="mb-4">📅 My Bookings</h3>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <div>Loading bookings...</div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-muted mt-4">
            You have no bookings yet.
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Class</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Join Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking._id || idx}>
                  <td>{booking.class?.className}</td>
                  <td>{booking.class?.date ? new Date(booking.class.date).toLocaleDateString('en-IN') : ''}</td>
                  <td>{booking.class?.time}</td>
                  <td>{booking.class?.price ? `₹${booking.class.price}` : ''}</td>
                  <td>
                    <Badge bg={getBadgeVariant(booking.status)}>{booking.status}</Badge>
                  </td>
                  <td>
                    {booking.status?.toLowerCase() === 'confirmed' && booking.class?.meetingLink ? (
                      <a href={booking.class.meetingLink} target="_blank" rel="noopener noreferrer">
                        Join Class
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    {booking.status?.toLowerCase() === 'confirmed' && (
                      <Button variant="danger" size="sm" onClick={() => cancelBooking(booking._id)}>
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default MyBookings;
