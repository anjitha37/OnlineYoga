const express = require('express');
const router = express.Router();
const Booking = require('../model/bookingmodel');
const Class = require('../model/classmodel');
const User = require('../model/usermodel');
const jwt = require('jsonwebtoken');


// Create a new booking
router.post('/book', async (req, res) => {
  try {
    const { userId, classId } = req.body;

    if (!userId || !classId) {
      return res.status(400).json({ msg: "Missing userId or classId" });
    }

    const yogaClass = await Class.findById(classId);
    if (!yogaClass) return res.status(404).json({ msg: "Class not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const instructorId = yogaClass.instructorId || null;

    const booking = new Booking({
      user: userId,
      instructorId: instructorId,
      class: classId,
      status: "Confirmed",
    });

    await booking.save();
    res.status(201).json({ msg: "Booking confirmed", booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ msg: "Server error during booking" });
  }
});

// Get bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('class')
      .populate('instructorId');

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: "Token missing" });

  jwt.verify(token, "jwtsecretkey123", (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// ✅ Get all bookings for an instructor
router.get('/bookings', verifyToken, async (req, res) => {
  const instructorId = req.query.instructorId;

  if (!instructorId) return res.status(400).json({ msg: "Missing instructorId" });

  try {
    const bookings = await Booking.find({ instructorId })
      .populate('user', 'fullname email')
      .populate('class', 'className date time');

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching instructor bookings:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
