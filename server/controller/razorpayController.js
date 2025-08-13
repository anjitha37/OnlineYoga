const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_ZvPDDKTI4kSjSC',
  key_secret: 'kAMCOYOzQTPA9ysY4LWAxE63'
});

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ msg: "Error creating order" });
  }
};

module.exports = { createOrder };
