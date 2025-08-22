import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
} from "recharts";
import AdminNavbar from "./adminnav";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { FaChartBar, FaChartPie } from "react-icons/fa";
import "./adminNav.css";
import { StoreContext } from "../../context/StoreContext"; // ✅ import context

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Reports() {
  const { url } = useContext(StoreContext); // ✅ get backend URL
  const [userStats, setUserStats] = useState([]);
  const [sessionStats, setSessionStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${url}/api/admin/reports`) // ✅ dynamic backend URL
      .then((res) => {
        setUserStats(res.data.userRegistrations);
        setSessionStats(res.data.sessionTypes);
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Failed to load reports. Please try again later.");
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return (
      <div className="admin-dashboard-wrapper">
        <AdminNavbar />
        <div className="admin-content d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" role="status" />
          <span className="ms-3">Loading reports...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-wrapper">
        <AdminNavbar />
        <div className="admin-content">
          <Container className="mt-5">
            <Alert variant="danger" className="text-center shadow">
              {error}
            </Alert>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper">
      <AdminNavbar />
      <div className="admin-content" style={{ flexDirection: "column", padding: "20px" }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">📊 Admin Reports Dashboard</h2>
            <p className="text-muted">Get insights into user activity and yoga session trends</p>
          </div>

          <Row>
            <Col md={6} className="mb-4">
              <Card
                className="shadow-lg border-0"
                style={{
                  backdropFilter: "blur(10px)",
                  background: "rgba(255, 255, 255, 0.75)",
                  borderRadius: "20px",
                }}
              >
                <Card.Header className="bg-primary text-white d-flex align-items-center gap-2 rounded-top">
                  <FaChartBar /> User Registrations Over Months
                </Card.Header>
                <Card.Body>
                  <BarChart
                    width={500}
                    height={250}
                    data={userStats}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#007bff" />
                  </BarChart>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card
                className="shadow-lg border-0"
                style={{
                  backdropFilter: "blur(10px)",
                  background: "rgba(255, 255, 255, 0.75)",
                  borderRadius: "20px",
                }}
              >
                <Card.Header className="bg-success text-white d-flex align-items-center gap-2 rounded-top">
                  <FaChartPie /> Yoga Session Types Distribution
                </Card.Header>
                <Card.Body>
                  <PieChart width={400} height={250}>
                    <Pie
                      data={sessionStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sessionStats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Reports;
