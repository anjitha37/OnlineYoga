const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const userRouter = require('./routes/userrouter');
const adminRouter = require('./routes/adminrouter');
const instructorRouter = require('./routes/instructorrouter');
const bookingRouter = require('./routes/bookingrouter');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

// ✅ CORS setup with multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle frontend routing, serve index.html for all unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/yoga");
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Error occurred", err);
  }
};
dbConnect();

// ✅ Mount routes
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/instructor', instructorRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payment', paymentRoutes);

// ✅ Start server
app.listen(9001, () => {
  console.log("Server Started Successfully");
});
