import React from "react";
import InstructorNav from "./instructornav";

export default function InstructorHome() {
  const containerStyle = {
    position: "fixed", // full-screen fixed
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const overlayStyle = {
    // backgroundColor: "rgba(209, 82, 82, 0.7)", // Light overlay for readability
    padding: "50px",
    // borderRadius: "15px",
    color: "#000",
    textAlign: "center",
    // maxWidth: "700px",
    // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  };

  const headingStyle = {
    fontSize: "2rem",
    marginBottom: "20px",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.6",
  };

  return (
    <>
      <InstructorNav />
      {/* Padding so nav doesn't overlap content */}
      <div style={{ paddingTop: "60px" }} />
      <div style={containerStyle}>
        <div style={overlayStyle}>
          <h1 style={headingStyle}>Welcome to the Instructor Dashboard</h1>
          <p style={paragraphStyle}>
            Manage your yoga classes, view student bookings, and keep your teaching schedule organized. Inspire and guide students on their yoga journey.
          </p>
        </div>
      </div>
    </>
  );
}

