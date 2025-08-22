import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext"; // ✅ correct import

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { url } = useContext(StoreContext); // ✅ get url from context

  useEffect(() => {
    axios
      .get(`${url}/api/admin/users/${id}`) // ✅ dynamic url
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id, url]);

  if (!user)
    return (
      <Container>
        <p>Loading user data...</p>
      </Container>
    );

  return (
    <Container style={{ marginTop: "80px" }}>
      <Card>
        <Card.Header>
          <h4>User Details</h4>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>ID:</strong> {user._id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          {/* ✅ Add more user fields here if needed */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewUser;
