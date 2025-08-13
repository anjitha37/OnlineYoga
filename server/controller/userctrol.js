const User = require('../model/usermodel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Class = require('../model/classmodel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Booking = require('../model/bookingmodel');
const mongoose = require("mongoose");
const Review = require('../model/reviewmodel');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Set up Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/certificates';
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });


const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phone, age, gender, experience, role, agreeTerms } = req.body;

    // Base validation
    const requiredFields = [
      !fullname && "Full name",
      !email && "Email",
      !password && "Password",
      !phone && "Phone number",
      !age && "Age",
      !gender && "Gender",
      !role && "Role",
      (agreeTerms !== "true") && "Agreement to terms"
    ].filter(Boolean);

    if (requiredFields.length > 0) {
      return res.status(400).json({ 
        msg: `Missing required fields: ${requiredFields.join(", ")}` 
      });
    }

    // Role-specific validation
    if (role === "user" && !experience) {
      return res.status(400).json({ msg: "Experience level is required for users" });
    }

    if (role === "instructor" && !req.file) {
      return res.status(400).json({ msg: "Certificate upload is required for instructors" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      phone,
      age: Number(age),
      gender,
      experience: role === "user" ? experience : undefined,
      role,
      certificate: role === "instructor" ? `certificates/${req.file.filename}` : undefined,
      agreeTerms: agreeTerms === "true"
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ 
      msg: err.code === 11000 ? "Email already exists" : "Server error during registration" 
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const loggedUser = await User.findOne({ email: email });

    if (!loggedUser) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, loggedUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
     
     if (loggedUser.role === 'instructor' && !loggedUser.isApproved) {
      return res.status(403).json({ msg: "Instructor account pending approval by admin." });
    }

    // Create JWT token
   const token = jwt.sign(
  { id: loggedUser._id, role: loggedUser.role.charAt(0).toUpperCase() + loggedUser.role.slice(1).toLowerCase() },
  "jwtsecretkey123",
  { expiresIn: "10d" }
);
 

    res.status(200).json({
      status:200,
      msg: "User Logged In Successfully",
      token: token,
      user: {
        id: loggedUser._id,
        _id: loggedUser._id,
        fullname: loggedUser.fullname,
        email: loggedUser.email,
        role: loggedUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "No user found with this email" });

    // Create token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 min expiry

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});


  
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: "Your App <yourgmail@gmail.com>",
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 15 minutes.</p>`
    });

    res.json({ msg: "Password reset link sent to email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


// GET: Fetch all classes for users
const getAllClasses = async (req, res) => {
  console.log("Fetching all classes...");
  try {
    const classes = await Class.find()
      .sort({ date: 1 })
      .populate('instructorId', 'fullname'); // 👈 populate instructor name

    res.status(200).json(classes);
  } catch (err) {
    console.error("Error fetching classes:", err);
    res.status(500).json({ msg: "Error fetching classes" });
  }
};



const getClassById = async (req, res) => {
  try {
    const classId = req.params.id;

    const yogaClass = await Class.findById(classId).populate('instructorId', 'fullname');

    if (!yogaClass) {
      return res.status(404).json({ msg: "Class not found" });
    }

    const response = {
      ...yogaClass.toObject(),
      instructorName: yogaClass.instructorId?.fullname || "Unknown",
    };

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching class:", err);
    res.status(500).json({ msg: "Error fetching class" });
  }
};



const createBooking = async (req, res) => {
  console.log('Booking request body:', req.body);
  try {
    let { userId, classId } = req.body;

    // Validate presence
    if (!userId || !classId) {
      return res.status(400).json({ msg: "Missing userId or classId" });
    }

    // Validate and cast to ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ msg: "Invalid userId or classId" });
    }

    userId = new mongoose.Types.ObjectId(userId);
    classId = new mongoose.Types.ObjectId(classId);

    const existing = await Booking.findOne({ userId, classId });
    if (existing) return res.status(400).json({ msg: "Already booked." });

   const yogaClass = await Class.findById(classId);
if (!yogaClass) return res.status(404).json({ msg: "Class not found" });

const booking = new Booking({
  user: userId,
  class: classId,
  instructorId: yogaClass.instructorId,
  status:'pending'
});
await booking.save();

    res.status(200).json({ msg: "Booking created,pending payment confirmation from instructor", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ msg: "Error booking class", error: err.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ user: userId })
      .populate('class')
      .sort({ bookedAt: -1 });

    const bookingsWithLinks = bookings.map(booking => {
      const classObj = booking.class?.toObject?.() || booking.class;

      return {
        ...booking.toObject(),
        class: {
          ...classObj,
          meetingLink: booking.status === 'confirmed' ? classObj.meetingLink : undefined
        }
      };
    });

    res.status(200).json(bookingsWithLinks);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ msg: "Error fetching bookings", err });
  }
};



const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByIdAndUpdate(bookingId, { status: 'cancelled' }, { new: true });
    res.status(200).json({ msg: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ msg: "Error cancelling booking", err });
  }
};

// controllers/userController.js

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const createReview = async (req, res) => {
  try {
    const { userId, classId, rating, comment } = req.body;

    // Check if the user has booked this class
    const booking = await Booking.findOne({ user: userId, class: classId, status: 'confirmed' });
    if (!booking) {
      return res.status(403).json({ msg: "You haven't booked or confirmed this class." });
    }

    // Check if user already submitted a review
    const existing = await Review.findOne({ userId, classId });
    if (existing) {
      return res.status(400).json({ msg: "You have already reviewed this class." });
    }

    const review = new Review({ userId, classId, rating, comment });
    await review.save();
    res.status(201).json({ msg: "Review submitted", review });
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).json({ msg: "Server error while submitting review" });
  }
};

const getReviewsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await Review.find({ userId }).populate('classId');
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ msg: "Error fetching reviews" });
  }
};

const getBookedClassesForReview = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ user: userId, status: 'confirmed' }).populate('class');
    const classes = bookings.map(b => b.class);
    res.status(200).json(classes);
  } catch (err) {
    console.error("Error fetching booked classes:", err);
    res.status(500).json({ msg: "Error fetching booked classes" });
  }
};


module.exports={registerUser, loginUser, getAllClasses,getClassById, upload, createBooking,getUserBookings,cancelBooking, getUserProfile, createReview,getReviewsByUser,getBookedClassesForReview,forgotPassword,resetPassword}