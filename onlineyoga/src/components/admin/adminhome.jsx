import React from "react";
import AdminNavbar from "./adminnav"; // Ensure this path is correct

export default function AdminHome() {
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')", // You can change this image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const overlayStyle = {
    padding: "50px",
    color: "#000",
    textAlign: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    // borderRadius: "15px",
  };

  const headingStyle = {
    fontSize: "2.2rem",
    marginBottom: "20px",
    fontWeight: "bold",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    maxWidth: "600px",
  };

  return (
    <>
      <AdminNavbar />
      <div style={{ paddingTop: "60px" }} />
      <div style={containerStyle}>
        <div style={overlayStyle}>
          <h1 style={headingStyle}>Welcome to the Admin Dashboard</h1>
          <p style={paragraphStyle}>
            Oversee platform activity, manage users and instructors, approve registrations, and maintain the health of the online yoga community. Your role is vital in ensuring smooth operations and a secure environment.
          </p>
        </div>
      </div>
    </>
  );
}
