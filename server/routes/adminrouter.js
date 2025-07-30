// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser, getUserById , approveUser, getAdminProfile, getReports} = require("../controller/Adminctrol");

// GET all users for admin
router.get("/users", getAllUsers)

// GET user by ID
router.get("/users/:id", getUserById);

// Approve a user (typically instructor)
router.post("/users/approve/:id", approveUser);


// DELETE a user by ID
router.delete("/users/:id", deleteUser);

// ✅ Admin Reports Endpoint
router.get("/reports", getReports);


// New route to fetch admin profile by fixed email
router.get("/profile", getAdminProfile);

module.exports = router;
