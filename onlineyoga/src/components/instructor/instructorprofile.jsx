// import React, { useEffect, useState } from 'react';
// import { Container, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { FaUserTie } from 'react-icons/fa'; // Use a different icon for instructors if you like
// import InstructorNav from './instructornav';

// const InstructorProfile = () => {
//   const [instructor, setInstructor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchInstructorProfile = async () => {
//       try {
//         const instructorId = localStorage.getItem("userId"); // Assuming you store the instructor's id as userId
//         if (!instructorId) {
//           setError("No instructor ID found. Please log in again.");
//           setLoading(false);
//           return;
//         }
//         if (instructorId.length < 24) {
//           setError("Invalid instructor ID format.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`http://localhost:9001/api/user/profile/${instructorId}`);
//         setInstructor(response.data);
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

//     fetchInstructorProfile();
//   }, []);

//   if (loading) {
//     return (
//       <>
//         <InstructorNav/>
//         <Container className="mt-5">
//           <h2 className="mb-4">Instructor Profile</h2>
//           <p>Loading profile...</p>
//         </Container>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <InstructorNav/>
//         <Container className="mt-5">
//           <h2 className="mb-4">Instructor Profile</h2>
//           <div className="alert alert-danger">{error}</div>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <InstructorNav/>
//       <Container className="mt-5">
//         <h2 className="mb-4">Instructor Profile</h2>
//         {instructor ? (
//           <Card className="text-center p-4 shadow-sm">
//             <FaUserTie size={80} color="#6c757d" className="mb-3 mx-auto" />
//             <Card.Body>
//               <Card.Title>{instructor.fullname}</Card.Title>
//               <Card.Text><strong>Email:</strong> {instructor.email}</Card.Text>
//               <Card.Text><strong>Phone:</strong> {instructor.phone}</Card.Text>
//               <Card.Text><strong>Age:</strong> {instructor.age}</Card.Text>
//               <Card.Text><strong>Gender:</strong> {instructor.gender}</Card.Text>
//               <Card.Text><strong>Experience:</strong> {instructor.experience}</Card.Text>
//               <Card.Text><strong>Role:</strong> {instructor.role}</Card.Text>
//               <Card.Text><strong>Certificate:</strong> {instructor.certificate ? instructor.certificate : "Not uploaded"}</Card.Text>
//               <Card.Text><strong>Approval Status:</strong> {instructor.isApproved ? "Approved" : "Pending"}</Card.Text>
//             </Card.Body>
//           </Card>
//         ) : (
//           <p>No instructor data available.</p>
//         )}
//       </Container>
//     </>
//   );
// };

// export default InstructorProfile;
import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { FaUserTie } from 'react-icons/fa';
import InstructorNav from './instructornav';

const InstructorProfile = () => {
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructorProfile = async () => {
      try {
        const instructorId = localStorage.getItem("userId");
        if (!instructorId) {
          setError("No instructor ID found. Please log in again.");
          setLoading(false);
          return;
        }
        if (instructorId.length < 24) {
          setError("Invalid instructor ID format.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:9001/api/user/profile/${instructorId}`);
        setInstructor(response.data);
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

    fetchInstructorProfile();
  }, []);

  return (
    <>
      <InstructorNav />
      <div style={{
        background: 'linear-gradient(to right, #dbeafe, #f0f4f8)',
        minHeight: '100vh',
        paddingTop: '80px',
        paddingBottom: '40px'
      }}>
        <Container className="d-flex justify-content-center">
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <h2 className="text-center mb-4 text-primary fw-bold">Instructor Profile</h2>

            {loading ? (
              <div className="text-center">Loading profile...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : instructor ? (
              <Card className="p-4 shadow-lg text-center border-0 rounded-4 bg-white">
                <FaUserTie size={80} color="#0d6efd" className="mb-3" />
                <Card.Body>
                  <Card.Title className="fw-bold">{instructor.fullname}</Card.Title>
                  <hr />
                  <Card.Text><strong>Email:</strong> {instructor.email}</Card.Text>
                  <Card.Text><strong>Phone:</strong> {instructor.phone}</Card.Text>
                  <Card.Text><strong>Age:</strong> {instructor.age}</Card.Text>
                  <Card.Text><strong>Gender:</strong> {instructor.gender}</Card.Text>
                  <Card.Text><strong>Experience:</strong> {instructor.experience}</Card.Text>
                  <Card.Text><strong>Role:</strong> {instructor.role}</Card.Text>
                  <Card.Text><strong>Certificate:</strong> {instructor.certificate || "Not uploaded"}</Card.Text>
                  <Card.Text>
                    <strong>Approval Status:</strong>{' '}
                    <span className={instructor.isApproved ? "text-success" : "text-warning"}>
                      {instructor.isApproved ? "Approved" : "Pending"}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <p className="text-center">No instructor data available.</p>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default InstructorProfile;
