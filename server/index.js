const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const userRouter = require('./routes/userrouter');
const adminRouter = require('./routes/adminrouter');
const instructorRouter = require('./routes/instructorrouter');
const bookingRouter = require('./routes/bookingrouter');
const paymentRoutes = require('./routes/paymentRoutes');

// ✅ CORS setup: allow multiple origins directly
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://onlineyoga-frontend.onrender.com'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API routes
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/instructor', instructorRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payment', paymentRoutes);

// ✅ Centralized error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ✅ Start server after DB connection is established
const PORT = process.env.PORT || 9001;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Try for 10 seconds
      socketTimeoutMS: 45000 // Disconnect after 45 seconds of inactivity
    });
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Stop the server if DB fails to connect
  }
};

startServer();
