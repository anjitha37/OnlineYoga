import React from "react";
import UserNav from "./usernav";

export default function UserHome() {
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "#000",
    textAlign: "center",
    padding: "20px",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    maxWidth: "700px",
  };

  return (
    <>
      <UserNav />
      <div style={containerStyle}>
        <h1 style={headingStyle}>Welcome to Your Yoga Space</h1>
        <p style={paragraphStyle}>
          Discover classes from certified instructors, book and pay for sessions, join live yoga sessions, and access on-demand content anytime.
        </p>
      </div>
    </>
  );
}
