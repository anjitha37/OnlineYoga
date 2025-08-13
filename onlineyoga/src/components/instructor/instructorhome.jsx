import React from "react";
import InstructorNav from "./instructornav";
import './instructorNav.css';

export default function InstructorHome() {
  return (
    <div className="instructor-dashboard-wrapper">
      {/* Sidebar */}
      <InstructorNav />

      {/* Main Panel */}
      <div className="instructor-content">
        <div
          className="instructor-home-hero"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=100&dpr=2')"
          }}
        >
          <div className="hero-inner">
            <h1>Welcome to the Instructor Dashboard</h1>
            <p>
              Manage your yoga classes, view student bookings, and keep your teaching schedule organized. Inspire and guide students on their yoga journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
