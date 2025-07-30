const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  meetingLink: { type: String }
}, { timestamps: true });

const Class = mongoose.models.Class || mongoose.model('Class', classSchema);
module.exports = Class;
