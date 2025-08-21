


import React from "react";
import UserNav from "./usernav";
import "./UserNav.css";

export default function UserHome() {
  return (
    <div className="user-dashboard-wrapper">
      <div className="user-sidebar"><UserNav /></div>
      <div className="user-content">
        <div
          className="user-home-hero"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')"
          }}
        >
          <div className="hero-inner">
            <h1>Welcome to Your Yoga Space</h1>
            <p>
              Discover classes from certified instructors, book and pay for sessions,
              join live yoga sessions, and access on-demand content anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



