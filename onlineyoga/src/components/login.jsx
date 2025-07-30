

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Loginpage() {
  const [record, setRecord] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!record.email || !record.password) {
      alert("Please enter both email and password");
      return;
    }

    if (record.email === 'admin@gmail.com' && record.password === 'admin123') {
      alert('Admin login successful');
      localStorage.setItem('role', 'admin');
      navigate('/adminhome');
      return;
    }

    axios.post("http://localhost:9001/api/user/loginuser", record)
      .then((res) => {
        alert(res.data.msg);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.user?.role || "");
          localStorage.setItem("userId", res.data.user?.id || res.data.user?._id || "");
          if (res.data.user?.role?.toLowerCase() === 'instructor') {
            localStorage.setItem("instructorId", res.data.user._id);
          }
          const role = res.data.user?.role?.toLowerCase() || 'user';
          if (role === 'instructor') navigate("/instructorhome");
          else navigate("/userhome");
        }
      })
      .catch((err) => {
        console.error("Login error:", err.response?.data || err.message);
        alert("User Login failed: " + (err.response?.data?.msg || "Unknown error"));
      });
  };

  return (
    <div
      style={{
        height: "100vh", // FULL viewport height
        width: "100%", // FULL width
        backgroundImage: "url('https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "90%",
          //  background: "rgba(22, 53, 66, 0.97)",
          // borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", background: "white" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={record.email}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={record.password}
            required
            minLength={6}
            style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "1rem"
            }}
          >
            LOGIN
          </button>
        </form>
        <p style={{ textAlign: "center",background:"white" }}>
          <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
            New user? Register here
          </Link>
        </p>
        <p style={{ textAlign: "center", marginTop: "0.5rem" ,background:"white"}}>
          <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
