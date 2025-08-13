
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './components/homepage';
import Loginpage from './components/login';
import Register from './components/register';

// Admin components
import AdminHome from './components/admin/adminhome';
import ManageUsers from './components/admin/manageusers';
import ViewUser from './components/admin/viewuser';
import AdminProfile from './components/admin/adminprofile';
import Reports from './components/admin/reportspage';
import AdminLogout from './components/admin/logout';

// User components
import UserHome from './components/user/userhome';
import ViewClasses from './components/user/viewclasses';
import PaymentPage from './components/user/paymentpage';
import MyBookings from './components/user/mybookings';
import UserProfile from './components/user/userprofile';
import UserLogout from './components/user/userlogout';
import MyReviews from './components/user/myreviews';

// Instructor components
import InstructorHome from './components/instructor/instructorhome';
import AddClasses from './components/instructor/addclasses';
import ManageBookings from './components/instructor/managebooking';
import InstructorProfile from './components/instructor/instructorprofile';
import MyClasses from './components/instructor/myclasses';
import EditClass from './components/instructor/editclass';
import Earnings from './components/instructor/earnings';
import InstructorReviews from './components/instructor/review';
import DashboardLayout from './components/user/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/admin/manageusers" element={<ManageUsers />} />
        <Route path="/admin/viewuser/:id" element={<ViewUser />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/logout" element={<AdminLogout />} />

        {/* User Routes */}
        <Route path="/user" element={<DashboardLayout />}></Route>
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/user/classes" element={<ViewClasses />} />
        <Route path="/payment/:classId" element={<PaymentPage />} />
        <Route path="/user/bookings" element={<MyBookings />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/userlogout" element={<UserLogout />} />
        <Route path="/user/reviews" element={<MyReviews />} />

        {/* Instructor Routes */}
        <Route path="/instructorhome" element={<InstructorHome />} />
        <Route path="/instructor/addclasses" element={<AddClasses />} />
        <Route path="/instructor/bookings" element={<ManageBookings />} />
        <Route path="/instructor/profile" element={<InstructorProfile />} />
        <Route path="/instructor/myclasses" element={<MyClasses />} />
        <Route path="/instructor/editclass/:id" element={<EditClass />} />
        <Route path="/instructor/earnings/:id" element={<Earnings />} />
        <Route path="/instructor/reviews" element={<InstructorReviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
