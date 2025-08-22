import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { StoreContext } from "../../context/StoreContext"; // ✅ import
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import InstructorNav from './instructornav';
import './instructorNav.css';

const Earnings = () => {
  const { url } = useContext(StoreContext); // ✅ use url
  const instructorId = localStorage.getItem("instructorId");
  const [stats, setStats] = useState({ totalEarnings: 0, weeklyIncome: [], monthlyIncome: [], classCount: 0, totalAttendance: 0 });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (instructorId && token) fetchEarningsData();
    // eslint-disable-next-line
  }, [instructorId]);

  const fetchEarningsData = async () => {
    try {
      const res = await axios.get(`${url}/api/instructor/earnings/${instructorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load earnings data:", error);
      alert("Error loading analytics");
    }
  };

  return (
    <div className="instructor-dashboard-wrapper">
      {/* Sidebar */}
      <InstructorNav />

      {/* Main Content */}
      <div className="instructor-content">
        <Container style={{ maxWidth: '1200px', padding: '40px 20px' }}>
          <h2 className="text-center fw-bold text-primary mb-5">📈 Earnings & Analytics Dashboard</h2>

          <Row className="mb-5 g-4">
            <Col md={4}>
              <Card className="p-4 text-center shadow-lg border-0" style={{ backgroundColor: 'rgba(227,242,253,0.85)' }}>
                <h6 className="text-muted">Total Earnings</h6>
                <h3 className="text-success">₹ {stats.totalEarnings}</h3>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 text-center shadow-lg border-0" style={{ backgroundColor: 'rgba(252,228,236,0.85)' }}>
                <h6 className="text-muted">Classes Conducted</h6>
                <h3 className="text-primary">{stats.classCount}</h3>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 text-center shadow-lg border-0" style={{ backgroundColor: 'rgba(232,245,233,0.85)' }}>
                <h6 className="text-muted">Total Attendance</h6>
                <h3 className="text-warning">{stats.totalAttendance}</h3>
              </Card>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6}>
              <Card className="p-3 shadow border-0" style={{ backgroundColor: 'rgba(255,255,255,0.93)' }}>
                <h5 className="text-center text-secondary">Weekly Income</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.weeklyIncome}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#4a90e2" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="p-3 shadow border-0" style={{ backgroundColor: 'rgba(255,255,255,0.93)' }}>
                <h5 className="text-center text-secondary">Monthly Income</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.monthlyIncome}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#66bb6a" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Earnings;
