import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Table, Container, Button, Badge, Card } from 'react-bootstrap';
import InstructorNav from './instructornav';
import { StoreContext } from '../../context/StoreContext'; // ✅ import
import './instructorNav.css'; 

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { url } = useContext(StoreContext); // ✅ get url
  const token = localStorage.getItem("token");

  useEffect(() => {
    const id = localStorage.getItem('instructorId');
    if (!id || !token) {
      alert("Instructor not logged in");
      return;
    }
    fetchBookings(id);
    // eslint-disable-next-line
  }, []);

  const fetchBookings = async (instructorId) => {
    try {
      const res = await axios.get(
        `${url}/api/instructor/bookings?instructorId=${instructorId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(res.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      alert("Error loading bookings: " + (error.response?.data?.msg || "Unknown error"));
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.patch(
        `${url}/api/instructor/bookings/cancel/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking cancelled");
      fetchBookings(localStorage.getItem("instructorId"));
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking");
    }
  };

  const handleRespondToBooking = async (bookingId, action) => {
    try {
      await axios.put(
        `${url}/api/instructor/bookings/respond/${bookingId}`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Booking ${action}ed successfully`);
      fetchBookings(localStorage.getItem("instructorId"));
    } catch (error) {
      console.error(`Failed to ${action} booking:`, error);
      alert(`Failed to ${action} booking`);
    }
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
            <h3 className="text-center text-primary fw-bold mb-4">📋 Manage Bookings</h3>
            {bookings.length === 0 ? (
              <p className="text-center text-muted">No bookings found.</p>
            ) : (
              <Table striped bordered hover responsive className="table-light rounded shadow-sm">
                <thead className="table-dark text-center">
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Class</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {bookings.map((booking, index) => (
                    <tr key={booking._id}>
                      <td>{index + 1}</td>
                      <td>{booking.user?.fullname || "N/A"}</td>
                      <td>{booking.class?.className || "N/A"}</td>
                      <td>{booking.class?.date ? new Date(booking.class.date).toLocaleDateString() : "N/A"}</td>
                      <td>{booking.class?.time || "N/A"}</td>
                      <td>
                        <Badge bg={
                          booking.status === 'cancelled' ? 'danger'
                          : booking.status === 'pending' ? 'warning'
                          : booking.status === 'rejected' ? 'secondary'
                          : 'success'
                        }>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        {booking.status === 'pending' && (
                          <>
                            <Button
                              variant="outline-success"
                              size="sm"
                              className="me-2"
                              onClick={() => handleRespondToBooking(booking._id, 'confirm')}
                            >
                              ✅ Confirm
                            </Button>
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={() => handleRespondToBooking(booking._id, 'reject')}
                            >
                              ❌ Reject
                            </Button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            🛑 Cancel
                          </Button>
                        )}
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

export default ManageBookings;
