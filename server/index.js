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

// ✅ CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://onlineyoga-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
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

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB (Atlas or remote)
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Error occurred", err);
  }
};
dbConnect();

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/instructor', instructorRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payment', paymentRoutes);

// ✅ Start server (Render PORT)
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
