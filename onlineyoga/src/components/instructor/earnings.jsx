// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Card, Row, Col } from 'react-bootstrap';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
// } from 'recharts';
// import { useParams } from 'react-router-dom';
// import InstructorNav from './instructornav';

// const Earnings = () => {
//   const instructorId = localStorage.getItem("instructorId");
//   const [stats, setStats] = useState({
//     totalEarnings: 0,
//     weeklyIncome: [],
//     monthlyIncome: [],
//     classCount: 0,
//     totalAttendance: 0
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (instructorId && token) {
//       fetchEarningsData();
//     }
//   }, [instructorId]);

//   const fetchEarningsData = async () => {
//     try {
//       const res = await axios.get(`http://localhost:9001/api/instructor/earnings/${instructorId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setStats(res.data);
//     } catch (error) {
//       console.error("Failed to load earnings data:", error);
//       alert("Error loading analytics");
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundImage: 'linear-gradient(to right,rgb(45, 202, 124),rgb(45, 103, 126))', 
//       paddingBottom: '2rem'
//     }}>
//       <InstructorNav />
//       <Container className="mt-4">
//         <h3 className="mb-4 text-center">Earnings & Analytics</h3>

//         <Row className="mb-4">
//           <Col md={4}>
//             <Card className="p-3 text-center shadow">
//               <h5>Total Earnings</h5>
//               <h4>₹ {stats.totalEarnings}</h4>
//             </Card>
//           </Col>
//           <Col md={4}>
//             <Card className="p-3 text-center shadow">
//               <h5>Classes Conducted</h5>
//               <h4>{stats.classCount}</h4>
//             </Card>
//           </Col>
//           <Col md={4}>
//             <Card className="p-3 text-center shadow">
//               <h5>Total Attendance</h5>
//               <h4>{stats.totalAttendance}</h4>
//             </Card>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={6}>
//             <h5>Weekly Income</h5>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={stats.weeklyIncome}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="week" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="amount" fill="#654ea3" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Col>

//           <Col md={6}>
//             <h5>Monthly Income</h5>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={stats.monthlyIncome}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="amount" fill="#56ab2f" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Earnings;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import InstructorNav from './instructornav';

const Earnings = () => {
  const instructorId = localStorage.getItem("instructorId");
  const [stats, setStats] = useState({
    totalEarnings: 0,
    weeklyIncome: [],
    monthlyIncome: [],
    classCount: 0,
    totalAttendance: 0
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (instructorId && token) {
      fetchEarningsData();
    }
  }, [instructorId]);

  const fetchEarningsData = async () => {
    try {
      const res = await axios.get(`http://localhost:9001/api/instructor/earnings/${instructorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load earnings data:", error);
      alert("Error loading analytics");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(to right top, #dfe9f3, #ffffff)',
      paddingTop: '80px',
      paddingBottom: '3rem'
    }}>
      <InstructorNav />
      <Container>
        <h2 className="text-center fw-bold text-primary mb-5">📈 Earnings & Analytics Dashboard</h2>

        <Row className="mb-5 g-4">
          <Col md={4}>
            <Card className="p-4 text-center shadow-lg border-0" style={{ backgroundColor: '#e3f2fd' }}>
              <h6 className="text-muted">Total Earnings</h6>
              <h3 className="text-success">₹ {stats.totalEarnings}</h3>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 text-center shadow-lg border-0" style={{ backgroundColor: '#fce4ec' }}>
              <h6 className="text-muted">Classes Conducted</h6>
              <h3 className="text-primary">{stats.classCount}</h3>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 text-center shadow-lg border-0" style={{ backgroundColor: '#e8f5e9' }}>
              <h6 className="text-muted">Total Attendance</h6>
              <h3 className="text-warning">{stats.totalAttendance}</h3>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={6}>
            <Card className="p-3 shadow border-0">
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
            <Card className="p-3 shadow border-0">
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
  );
};

export default Earnings;
