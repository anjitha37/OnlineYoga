const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ✅ Add this
  status: { type: String,enum: ['pending', 'paid', 'confirmed', 'cancelled'], default: 'pending' }, // or 'cancelled'
  bookedAt: { type: Date, default: Date.now } // Optional: helps with sorting
});

module.exports = mongoose.model('Booking', bookingSchema);
