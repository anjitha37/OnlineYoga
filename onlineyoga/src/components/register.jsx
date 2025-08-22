import React, { useState, useContext } from "react";
import AXIOS from "axios";
import { useNavigate, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext"; // adjust path if needed

export default function Register() {
  const { url } = useContext(StoreContext); // ✅ backend API url
  const [record, setRecord] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    gender: "",
    role: "",
    experience: "",
    agreeTerms: false,
  });
  const [certificate, setCertificate] = useState(null); // store file object
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "agreeTerms") {
      setRecord({ ...record, agreeTerms: checked });
    } else {
      setRecord({ ...record, [name]: value });
    }
  };

  const validate = () => {
    if (!record.fullname.match(/^[A-Za-z\s]+$/)) {
      alert("Full Name should contain alphabets and spaces only.");
      return false;
    }
    if (
      !record.email.match(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      )
    ) {
      alert("Enter a valid email.");
      return false;
    }
    if (record.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    if (record.password !== record.confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    if (!record.phone.match(/^\d{10}$/)) {
      alert("Phone number must be exactly 10 digits.");
      return false;
    }
    const ageNum = Number(record.age);
    if (isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      alert("Age must be a number between 10 and 100.");
      return false;
    }
    if (!record.gender) {
      alert("Please select your gender.");
      return false;
    }
    if (!record.role || !["user", "instructor"].includes(record.role)) {
      alert("Please select a valid role (User or Instructor).");
      return false;
    }
    if (record.role === "user" && !record.experience) {
      alert("Please select your experience level.");
      return false;
    }
    if (!record.agreeTerms) {
      alert("You must agree to the terms and conditions.");
      return false;
    }
    if (record.role === "instructor" && !certificate) {
      alert("Please upload your instructor certificate.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const formData = new FormData();
    Object.keys(record).forEach((key) => {
      if (key !== "confirmPassword") {
        formData.append(key, record[key]);
      }
    });

    if (certificate) {
      formData.append("certificate", certificate); // must match backend multer single("certificate")
    }

    try {
      await AXIOS.post(`${url}/api/user/registeruser`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert(
        "Registration failed: " +
          (err.response?.data?.msg || "Unknown server error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-bg">
      <div className="register-container">
        <h2 className="register-title">User Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-group">
            <input
              type="text"
              name="fullname"
              className="input"
              value={record.fullname}
              onChange={handleChange}
              required
            />
            <label className="user-label">Full Name</label>
          </div>

          {/* Email */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              className="input"
              value={record.email}
              onChange={handleChange}
              required
            />
            <label className="user-label">Email</label>
          </div>

          {/* Password */}
          <div className="input-group">
            <input
              type="password"
              name="password"
              className="input"
              value={record.password}
              onChange={handleChange}
              required
            />
            <label className="user-label">Password</label>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              className="input"
              value={record.confirmPassword}
              onChange={handleChange}
              required
            />
            <label className="user-label">Confirm Password</label>
          </div>

          {/* Phone */}
          <div className="input-group">
            <input
              type="tel"
              name="phone"
              className="input"
              value={record.phone}
              onChange={handleChange}
              required
            />
            <label className="user-label">Phone Number</label>
          </div>

          {/* Age */}
          <div className="input-group">
            <input
              type="number"
              name="age"
              className="input"
              value={record.age}
              onChange={handleChange}
              required
            />
            <label className="user-label">Age</label>
          </div>

          {/* Gender */}
          <div className="input-group">
            <select
              className="input"
              name="gender"
              value={record.gender}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <label className="user-label">Gender</label>
          </div>

          {/* Role */}
          <div className="input-group">
            <select
              className="input"
              name="role"
              value={record.role}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="user">User</option>
              <option value="instructor">Instructor</option>
            </select>
            <label className="user-label">Role</label>
          </div>

          {/* Experience - only if user */}
          {record.role === "user" && (
            <div className="input-group">
              <select
                className="input"
                name="experience"
                value={record.experience}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <label className="user-label">Experience</label>
            </div>
          )}

          {/* Certificate Upload - only if instructor */}
          {record.role === "instructor" && (
            <div className="input-group">
              <input
                className="input"
                type="file"
                name="certificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setCertificate(e.target.files[0])}
                required
              />
              <label className="user-label">Upload Certificate</label>
            </div>
          )}

          {/* Terms and Conditions */}
          <p className="terms-box">
            <label className="terms-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={record.agreeTerms}
                onChange={handleChange}
                required
              />{" "}
              I agree to the terms and conditions
            </label>
          </p>

          {/* Submit */}
          <button type="submit" disabled={loading} className="cssbuttons-io">
            <p>{loading ? "Registering..." : "REGISTER"}</p>
          </button>
        </form>

        <p className="register-link">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
