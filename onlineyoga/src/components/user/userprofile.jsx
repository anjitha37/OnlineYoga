
// import React, { useEffect, useState } from 'react';
// import { Container, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { FaUserCircle } from 'react-icons/fa';
// import UserNav from './usernav';

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         if (!userId) {
//           setError("No user ID found. Please log in again.");
//           setLoading(false);
//           return;
//         }
//         if (userId.length < 24) {
//           setError("Invalid user ID format.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`http://localhost:9001/api/user/profile/${userId}`);
//         setUser(response.data);
//         setError(null);
//       } catch (err) {
//         if (err.response) {
//           setError(`Server error: ${err.response.data.message || err.response.data.msg || 'Unknown error'}`);
//         } else if (err.request) {
//           setError("No response from server. Please check if the server is running.");
//         } else {
//           setError(`Request error: ${err.message}`);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (loading) {
//     return (
//       <>
//         <UserNav />
//         <Container className="mt-5">
//           <h2 className="mb-4">My Profile</h2>
//           <p>Loading profile...</p>
//         </Container>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <UserNav />
//         <Container className="mt-5">
//           <h2 className="mb-4">My Profile</h2>
//           <div className="alert alert-danger">{error}</div>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <UserNav />
//       <Container className="mt-5">
//         <h2 className="mb-4">My Profile</h2>
//         {user ? (
//           <Card className="text-center p-4 shadow-sm">
//             <FaUserCircle size={80} color="#6c757d" className="mb-3 mx-auto" />
//             <Card.Body>
//               <Card.Title>{user.fullname}</Card.Title>
//               <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
//               <Card.Text><strong>Phone:</strong> {user.phone}</Card.Text>
//               <Card.Text><strong>Age:</strong> {user.age}</Card.Text>
//               <Card.Text><strong>Gender:</strong> {user.gender}</Card.Text>
//               <Card.Text><strong>Experience:</strong> {user.experience}</Card.Text>
//               <Card.Text><strong>Role:</strong> {user.role}</Card.Text>
//             </Card.Body>
//           </Card>
//         ) : (
//           <p>No user data available.</p>
//         )}
//       </Container>
//     </>
//   );
// };

// export default UserProfile;
import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import UserNav from './usernav';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("No user ID found. Please log in again.");
          setLoading(false);
          return;
        }
        if (userId.length < 24) {
          setError("Invalid user ID format.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:9001/api/user/profile/${userId}`);
        setUser(response.data);
        setError(null);
      } catch (err) {
        if (err.response) {
          setError(`Server error: ${err.response.data.message || err.response.data.msg || 'Unknown error'}`);
        } else if (err.request) {
          setError("No response from server. Please check if the server is running.");
        } else {
          setError(`Request error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <UserNav />
      <div style={{ background: 'linear-gradient(to right, #f8fafc, #e2e8f0)', minHeight: '100vh', paddingTop: '60px' }}>
        <Container>
          <h2 className="mb-4 text-center">👤 My Profile</h2>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading profile...</p>
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">{error}</Alert>
          ) : user ? (
            <Card className="mx-auto shadow p-4" style={{ maxWidth: '600px', borderRadius: '20px' }}>
              <div className="text-center mb-4">
                <FaUserCircle size={90} color="#6c757d" />
              </div>
              <Card.Body>
                <h4 className="text-primary">{user.fullname}</h4>
                <hr />
                <Row>
                  <Col sm={6}><strong>Email:</strong></Col>
                  <Col sm={6}>{user.email}</Col>
                </Row>
                <Row>
                  <Col sm={6}><strong>Phone:</strong></Col>
                  <Col sm={6}>{user.phone || 'N/A'}</Col>
                </Row>
                <Row>
                  <Col sm={6}><strong>Age:</strong></Col>
                  <Col sm={6}>{user.age || 'N/A'}</Col>
                </Row>
                <Row>
                  <Col sm={6}><strong>Gender:</strong></Col>
                  <Col sm={6}>{user.gender || 'N/A'}</Col>
                </Row>
                <Row>
                  <Col sm={6}><strong>Experience:</strong></Col>
                  <Col sm={6}>{user.experience || 'N/A'}</Col>
                </Row>
                <Row>
                  <Col sm={6}><strong>Role:</strong></Col>
                  <Col sm={6} className="text-capitalize">{user.role}</Col>
                </Row>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-center text-muted">No user data available.</p>
          )}
        </Container>
      </div>
    </>
  );
};

export default UserProfile;
