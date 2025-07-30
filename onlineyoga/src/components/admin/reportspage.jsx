// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   PieChart, Pie, Cell,
// } from "recharts";
// import AdminNavbar from "./adminnav";

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// function Reports() {
//   const [userStats, setUserStats] = useState([]);
//   const [sessionStats, setSessionStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:9001/api/admin/reports")
//       .then(res => {
//         // Example response:
//         // {
//         //   userRegistrations: [{ month: 'Jan', count: 30 }, { month: 'Feb', count: 45 }, ...],
//         //   sessionTypes: [{ name: 'Beginner', value: 40 }, { name: 'Advanced', value: 60 }],
//         // }
//         setUserStats(res.data.userRegistrations);
//         setSessionStats(res.data.sessionTypes);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load reports");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading reports...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//     <AdminNavbar/>
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Reports Dashboard</h2>

//       <h4>User Registrations Over Months</h4>
//       <BarChart
//         width={600} height={300} data={userStats}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="count" fill="#8884d8" />
//       </BarChart>

//       <h4>Yoga Session Types Distribution</h4>
//       <PieChart width={400} height={300}>
//         <Pie
//           data={sessionStats}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//           outerRadius={100}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {sessionStats.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </div>
//     </>
//   );
// }

// export default Reports;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
} from "recharts";
import AdminNavbar from "./adminnav";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { FaChartBar, FaChartPie } from "react-icons/fa";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Reports() {
  const [userStats, setUserStats] = useState([]);
  const [sessionStats, setSessionStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:9001/api/admin/reports")
      .then(res => {
        setUserStats(res.data.userRegistrations);
        setSessionStats(res.data.sessionTypes);
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Failed to load reports. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient" style={{
          background: "linear-gradient(to right, #e0eafc, #cfdef3)"
        }}>
          <Spinner animation="border" variant="primary" role="status" />
          <span className="ms-3">Loading reports...</span>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar />
        <Container className="mt-5">
          <Alert variant="danger" className="text-center shadow">
            {error}
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div style={{
        background: "linear-gradient(to right top, #dfe9f3, #ffffff)",
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px"
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">📊 Admin Reports Dashboard</h2>
            <p className="text-muted">Get insights into user activity and yoga session trends</p>
          </div>

          <Row>
            <Col md={6} className="mb-4">
              <Card className="shadow-lg border-0" style={{
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.75)",
                borderRadius: "20px"
              }}>
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
              <Card className="shadow-lg border-0" style={{
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.75)",
                borderRadius: "20px"
              }}>
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
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sessionStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
    </>
  );
}

export default Reports;

