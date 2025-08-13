
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";

export default function Loginpage() {
  const navigate = useNavigate();
  const { token } = useParams(); // token from URL for reset password
  const location = useLocation();

  const [mode, setMode] = useState("login"); // login | forgot | reset
  const [record, setRecord] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.pathname.includes("/reset-password/") && token) {
      setMode("reset");
    }
  }, [location, token]);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  // Login
  const handleLogin = (e) => {
    e.preventDefault();

    if (!record.email || !record.password) {
      alert("Please enter both email and password");
      return;
    }

    if (record.email === "admin@gmail.com" && record.password === "admin123") {
      alert("Admin login successful");
      localStorage.setItem("role", "admin");
      navigate("/adminhome");
      return;
    }

    axios
      .post("http://localhost:9001/api/user/loginuser", record)
      .then((res) => {
        alert(res.data.msg);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.user?.role || "");
          localStorage.setItem(
            "userId",
            res.data.user?.id || res.data.user?._id || ""
          );
          if (res.data.user?.role?.toLowerCase() === "instructor") {
            localStorage.setItem("instructorId", res.data.user._id);
          }
          const role = res.data.user?.role?.toLowerCase() || "user";
          if (role === "instructor") navigate("/instructorhome");
          else navigate("/userhome");
        }
      })
      .catch((err) => {
        console.error("Login error:", err.response?.data || err.message);
        alert(
          "User Login failed: " +
            (err.response?.data?.msg || "Unknown error")
        );
      });
  };

  // Forgot Password
  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9001/api/user/forgot-password",
        { email }
      );
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error sending reset link");
    }
  };

  // Reset Password
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:9001/api/user/reset-password/${token}`,
        { password: newPassword }
      );
      setMessage(res.data.msg);
      setTimeout(() => {
        setMode("login");
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error resetting password");
    }
  };

  return (
    <div className="login-wrapper">
      {mode === "login" && (
        <form className="form" onSubmit={handleLogin}>
          {/* Email */}
          <div className="flex-column">
            <label>Email</label>
          </div>
          <div className="inputForm">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input"
              value={record.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input"
              value={record.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Options Row */}
          <div className="flex-row">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <span
              className="span"
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setMode("forgot")}
            >
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <button type="submit" className="button-submit">
            Sign In
          </button>

          {/* Register Link */}
          <p className="p">
            Don't have an account?
            <Link className="span" to="/register"> Sign Up</Link>
          </p>

          {/* Back Home Link */}
          <p className="p">
            <Link className="span" to="/">← Back to Home</Link>
          </p>
        </form>
      )}

      {mode === "forgot" && (
        <form className="form" onSubmit={handleForgot}>
          <h3>Forgot Password</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="button-submit">
            Send Reset Link
          </button>
          <p style={{ color: "green" }}>{message}</p>
          <p
            className="span"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setMode("login")}
          >
            ← Back to Login
          </p>
        </form>
      )}

      {mode === "reset" && (
        <form className="form" onSubmit={handleReset}>
          <h3>Reset Password</h3>
          <input
            type="password"
            placeholder="Enter new password"
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="button-submit">
            Reset Password
          </button>
          <p style={{ color: "green" }}>{message}</p>
        </form>
      )}
    </div>
  );
}
