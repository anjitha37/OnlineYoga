// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder } = require('../controller/razorpayController');

router.post('/create-order', createOrder);

module.exports = router;
