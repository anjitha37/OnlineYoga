
// import React, { useState, useEffect } from 'react';
// import { Table, Button, Container, Modal } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import AdminNavbar from './adminnav';

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedInstructor, setSelectedInstructor] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//   axios.get('http://localhost:9001/api/admin/users')
//     .then((response) => {
//       const filteredUsers = response.data.filter(user => user.role !== 'admin');
//       setUsers(filteredUsers);
//     })
//     .catch((error) => {
//       console.error("Error fetching users:", error);
//     });
// }, []);


//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`http://localhost:9001/api/admin/users/${id}`);
//         setUsers(users.filter(user => user._id !== id));
//       } catch (error) {
//         console.error('Delete failed:', error);
//       }
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await axios.post(`http://localhost:9001/api/admin/users/approve/${id}`);
//       alert("User approved!");
//       setUsers(users.map(user =>
//         user._id === id ? { ...user, isApproved: true } : user
//       ));
//     } catch (error) {
//       console.error("Approval failed:", error);
//     }
//   };

//   const handleViewInstructor = (user) => {
//     setSelectedInstructor(user);
//     setShowModal(true);
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <Container style={{ marginTop: '80px' }}>
//         <h2 className="mb-4">Manage Users</h2>
//         <Table striped bordered hover responsive>
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th style={{ textAlign: 'center' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user._id}>
//                   <td>{user._id}</td>
//                   <td>{user.email}</td>
//                   <td>{user.role}</td>
//                   <td style={{ textAlign: 'center' }}>
//                     {user.role === "instructor" ? (
//                       <Button
//                         variant="info"
//                         size="sm"
//                         className="me-2"
//                         onClick={() => handleViewInstructor(user)}
//                       >
//                         View Details
//                       </Button>
//                     ) : (
//                       <Button
//                         variant="info"
//                         size="sm"
//                         className="me-2"
//                         onClick={() => navigate(`/admin/viewuser/${user._id}`)}
//                       >
//                         View
//                       </Button>
//                     )}
//                     {user.role === "instructor" && !user.isApproved && (
//                       <Button
//                         variant="success"
//                         size="sm"
//                         className="me-2"
//                         onClick={() => handleApprove(user._id)}
//                       >
//                         Approve
//                       </Button>
//                     )}
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => handleDelete(user._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center">No users found.</td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </Container>

//       {/* Instructor Details Modal */}
//      <Modal show={showModal} onHide={() => setShowModal(false)}>
//   <Modal.Header closeButton>
//     <Modal.Title>Instructor Details</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <p><strong>Full Name:</strong> {selectedInstructor?.fullname || 'N/A'}</p>
//     <p><strong>Email:</strong> {selectedInstructor?.email || 'N/A'}</p>
//     <p><strong>Phone:</strong> {selectedInstructor?.phone || 'N/A'}</p>
//     <p><strong>Gender:</strong> {selectedInstructor?.gender || 'N/A'}</p>
//     <p><strong>Age:</strong> {selectedInstructor?.age || 'N/A'}</p>
//     <p><strong>Certificate:</strong><br />
//       {selectedInstructor?.certificate ? (
//         <a href={`http://localhost:9001/uploads/${selectedInstructor.certificate}`} target="_blank" rel="noopener noreferrer">View Certificate</a>
//       ) : (
//         "No certificate uploaded."
//       )}
//     </p>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
//   </Modal.Footer>
// </Modal>

//     </>
//   );
// };

// export default ManageUsers;
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Modal, Card, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminnav';
import { FaUsersCog } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9001/api/admin/users')
      .then((response) => {
        const filteredUsers = response.data.filter(user => user.role !== 'admin');
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:9001/api/admin/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:9001/api/admin/users/approve/${id}`);
      alert("User approved!");
      setUsers(users.map(user =>
        user._id === id ? { ...user, isApproved: true } : user
      ));
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  const handleViewInstructor = (user) => {
    setSelectedInstructor(user);
    setShowModal(true);
  };

  return (
    <>
      <AdminNavbar />
      <Container className="py-5">
        <Card className="shadow-lg border-0">
          <Card.Body>
            <h2 className="text-center mb-4 text-primary d-flex align-items-center justify-content-center gap-2">
              <FaUsersCog /> Manage Users
            </h2>

            <Table striped hover responsive className="align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="text-center">
                      <td>{user._id}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge bg={user.role === 'instructor' ? 'success' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                          {user.role === "instructor" ? (
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleViewInstructor(user)}
                            >
                              View Details
                            </Button>
                          ) : (
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => navigate(`/admin/viewuser/${user._id}`)}
                            >
                              View
                            </Button>
                          )}
                          {user.role === "instructor" && !user.isApproved && (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleApprove(user._id)}
                            >
                              Approve
                            </Button>
                          )}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-3">No users found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* Instructor Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Instructor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Full Name:</strong> {selectedInstructor?.fullname || 'N/A'}</p>
          <p><strong>Email:</strong> {selectedInstructor?.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {selectedInstructor?.phone || 'N/A'}</p>
          <p><strong>Gender:</strong> {selectedInstructor?.gender || 'N/A'}</p>
          <p><strong>Age:</strong> {selectedInstructor?.age || 'N/A'}</p>
          <p><strong>Certificate:</strong><br />
            {selectedInstructor?.certificate ? (
              <a
                href={`http://localhost:9001/uploads/${selectedInstructor.certificate}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate
              </a>
            ) : (
              "No certificate uploaded."
            )}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageUsers;
