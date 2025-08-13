import React from "react";
import AdminNavbar from "./adminnav";
import './adminNav.css';

export default function AdminHome() {
  return (
    <div className="admin-dashboard-wrapper">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="admin-content">
        <div
          className="admin-home-hero"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')"
          }}
        >
          <div className="hero-inner">
            <h1>Welcome to the Admin Dashboard</h1>
            <p>
              Oversee platform activity, manage users and instructors, approve registrations,
              and maintain the health of the online yoga community. Your role is vital in
              ensuring smooth operations and a secure environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
