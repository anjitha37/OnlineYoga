import React from 'react';
import UserNav from './usernav'; // Sidebar
import { Outlet } from 'react-router-dom'; // or include page content manually
import './UserNav.css';

function DashboardLayout() {
  return (
    <>
      <UserNav />
      <div className="user-content">
        <Outlet /> {/* This is where the other pages like Home, Bookings, etc. will render */}
      </div>
    </>
  );
}

export default DashboardLayout;
