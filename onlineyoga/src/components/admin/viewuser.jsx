import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9001/api/admin/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Error fetching user:', err));
  }, [id]);

  if (!user) return <Container><p>Loading user data...</p></Container>;

  return (
    <Container style={{ marginTop: '80px' }}>
      <Card>
        <Card.Header><h4>User Details</h4></Card.Header>
        <Card.Body>
          <p><strong>ID:</strong> {user._id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {/* Add more user fields here */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewUser;
