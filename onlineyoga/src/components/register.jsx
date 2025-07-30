
import React, { useState } from "react";
import AXIOS from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
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
  const [certificate, setCertificate] = useState(null);
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
    if (!record.email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
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
      formData.append("certificate", certificate); // ✅ important: this must match Multer field name
    }

    try {
      await AXIOS.post("http://localhost:9001/api/user/registeruser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert("Registration failed: " + (err.response?.data?.msg || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "6vh",
        minWidth: "90vw",
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "50%",
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", backgroundColor: "white" }}>
          User Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <p><input type="text" name="fullname" placeholder="Full Name" value={record.fullname} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} /></p>
          <p><input type="email" name="email" placeholder="Email" value={record.email} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} /></p>
          <p><input type="password" name="password" placeholder="Password" value={record.password} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} /></p>
          <p><input type="password" name="confirmPassword" placeholder="Confirm Password" value={record.confirmPassword} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} /></p>
          <p><input type="tel" name="phone" placeholder="Phone Number (10 digits)" value={record.phone} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} /></p>
          <p><input type="number" name="age" placeholder="Age" value={record.age} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} /></p>
          <p>
            <select name="gender" value={record.gender} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginTop: "4px" }}>
              <option value="">--Select Gender--</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </p>
          <p>
            <select name="role" value={record.role} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginTop: "4px" }}>
              <option value="">--Select Role--</option>
              <option value="user">User</option>
              <option value="instructor">Instructor</option>
            </select>
          </p>

          {record.role === "user" && (
            <p>
              <select name="experience" value={record.experience} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginTop: "4px" }}>
                <option value="">--Select Experience--</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </p>
          )}

          {record.role === "instructor" && (
            <p style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="file"
                name="certificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setCertificate(e.target.files[0])}
                required
                style={{ width: "100%", padding: "8px", marginTop: "4px", backgroundColor: "white" }}
              />
            </p>
          )}

          <p style={{ background: "#fff", padding: "10px", borderRadius: "6px" }}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={record.agreeTerms}
                onChange={handleChange}
                required
                style={{ marginRight: "8px" }}
              />
              I agree to the terms and conditions
            </label>
          </p>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "#aaa" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
