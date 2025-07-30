// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Form, Button } from 'react-bootstrap';

// const PaymentPage = () => {
//   const { classId } = useParams();
//   const navigate = useNavigate();

//   const [classInfo, setClassInfo] = useState(null);
//   const [paymentData, setPaymentData] = useState({
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//     nameOnCard: ''
//   });

//   useEffect(() => {
//     // Fetch class details
//     axios.get(`http://localhost:9001/api/user/classes/${classId}`)
//       .then(res => {
//         setClassInfo(res.data);
//       })
//       .catch(err => {
//         console.error('Failed to fetch class info', err);
//       });
//   }, [classId]);

//   const handleChange = (e) => {
//     setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { cardNumber, expiry, cvv, nameOnCard } = paymentData;
//     if (!cardNumber || !expiry || !cvv || !nameOnCard) {
//       alert('Please fill all payment details');
//       return;
//     }

//     try {
//       const userId = localStorage.getItem('userId'); // Ensure this is stored at login/registration
//       if (!userId) {
//         alert("User not logged in");
//         return;
//       }

//       // Simulate payment success
//       alert('Payment successful! Booking your class...');

//       // Send booking info to backend
//       await axios.post('http://localhost:9001/api/user/bookings/book', {
//         userId,
//         classId
//       });

//       alert('Your class booking is confirmed!');
//       navigate('/userhome');
//     } catch (err) {
//       console.error("Error saving booking:", err);
//       alert("Payment succeeded, but booking failed. Please try again or contact support.");
//     }
//   };

//   if (!classInfo) return <p>Loading class details...</p>;

//   return (
//     <Container className="mt-5" style={{ maxWidth: '500px' }}>
//       <h3>Payment for: {classInfo.className}</h3>
//       <p>
//         <strong>Date:</strong> {new Date(classInfo.date).toLocaleDateString()}<br />
//         <strong>Time:</strong> {classInfo.time}<br />
//         <strong>Duration:</strong> {classInfo.duration} mins<br/>
//         <strong>Price:</strong> ₹{classInfo.price}
//       </p>

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="cardNumber">
//           <Form.Label>Card Number</Form.Label>
//           <Form.Control
//             type="text"
//             name="cardNumber"
//             placeholder="1234 5678 9012 3456"
//             value={paymentData.cardNumber}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expiry">
//           <Form.Label>Expiry Date</Form.Label>
//           <Form.Control
//             type="text"
//             name="expiry"
//             placeholder="MM/YY"
//             value={paymentData.expiry}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="cvv">
//           <Form.Label>CVV</Form.Label>
//           <Form.Control
//             type="password"
//             name="cvv"
//             placeholder="123"
//             value={paymentData.cvv}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="nameOnCard">
//           <Form.Label>Name on Card</Form.Label>
//           <Form.Control
//             type="text"
//             name="nameOnCard"
//             placeholder="Your Name"
//             value={paymentData.nameOnCard}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Button variant="success" type="submit">
//           Pay Now
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default PaymentPage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { FaCreditCard, FaUser, FaCalendarAlt, FaClock, FaRupeeSign } from 'react-icons/fa';

const PaymentPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [classInfo, setClassInfo] = useState(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:9001/api/user/classes/${classId}`)
      .then(res => {
        setClassInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch class info', err);
        setMessage("Failed to load class details.");
        setLoading(false);
      });
  }, [classId]);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { cardNumber, expiry, cvv, nameOnCard } = paymentData;
    if (!cardNumber || !expiry || !cvv || !nameOnCard) {
      setMessage('⚠️ Please fill all payment details.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert("User not logged in");
        return;
      }

      alert('✅ Payment successful! Booking your class...');
      await axios.post('http://localhost:9001/api/user/bookings/book', {
        userId,
        classId
      });

      alert('🎉 Your class booking is confirmed!');
      navigate('/userhome');
    } catch (err) {
      console.error("Error saving booking:", err);
      setMessage("Payment succeeded, but booking failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <div>Loading class details...</div>
      </div>
    );
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card className="p-4 shadow">
        <h4 className="text-center mb-4">💳 Payment for Yoga Class</h4>

        {message && <Alert variant="warning">{message}</Alert>}

        <Card className="mb-4 p-3 bg-light">
          <h5>{classInfo.className}</h5>
          <p><FaCalendarAlt className="me-2" /> Date: {new Date(classInfo.date).toLocaleDateString()}</p>
          <p><FaClock className="me-2" /> Time: {classInfo.time}</p>
          <p><FaUser className="me-2" /> Duration: {classInfo.duration} mins</p>
          <p><FaRupeeSign className="me-2" /> Price: ₹{classInfo.price}</p>
        </Card>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><FaCreditCard className="me-2" />Card Number</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={paymentData.expiry}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="password"
              name="cvv"
              placeholder="123"
              value={paymentData.cvv}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control
              type="text"
              name="nameOnCard"
              placeholder="Your Name"
              value={paymentData.nameOnCard}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="success" size="lg">
              💰 Pay ₹{classInfo.price} Now
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default PaymentPage;
