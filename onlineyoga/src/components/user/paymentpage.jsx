
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaClock, FaRupeeSign } from 'react-icons/fa';
import moment from 'moment';
import UserNav from './usernav';

const PaymentPage = () => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchClassInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/api/user/classes/${classId}`);
        setClassInfo(response.data);
      } catch (err) {
        setError('Failed to load class details.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassInfo();
  }, [classId]);

  const handlePayment = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Please log in to continue.");
      return;
    }

    try {
      const orderResponse = await axios.post('http://localhost:9001/api/payment/create-order', {
        amount: 10,
      });

      const order = orderResponse.data;

      const options = {
        key: 'rzp_test_ZvPDDKTI4kSjSC', // Replace with your Razorpay Test Key
        amount: order.amount,
        currency: order.currency,
        name: 'Online Yoga Class',
        description: classInfo.className,
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post('http://localhost:9001/api/user/bookings/book', {
              userId,
              classId,
            });
            alert('🎉 Payment successful & class booked!');
            navigate('/userhome');
          } catch (bookingErr) {
            console.error('Booking failed:', bookingErr);
            alert('Payment succeeded, but booking failed.');
          }
        },
        prefill: {
          name: 'Yoga User',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#28a745',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
    <UserNav />
    <div className="user-content">
    <Container className="my-5">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Card className="p-4 shadow">
          <h3 className="mb-4 text-center">Pay for Your Yoga Session</h3>

          <p><FaUser /> <strong>Instructor:</strong> {classInfo?.instructorName || 'N/A'}</p>

          <p>
            <FaCalendarAlt /> <strong>Date:</strong>{' '}
            {classInfo.date ? moment(classInfo.date).format('YYYY-MM-DD') : 'N/A'}
          </p>

          <p><FaClock /> <strong>Time:</strong> {classInfo.time}</p>

          <p><FaRupeeSign /> <strong>Amount:</strong> ₹{classInfo.price}</p>

          <div className="d-grid mt-4">
            <Button onClick={handlePayment} variant="success" size="lg">
              💳 Pay ₹{classInfo.price} Now
            </Button>
          </div>
        </Card>
      )}
    </Container>
    </div>
    </>
  );
};

export default PaymentPage;

