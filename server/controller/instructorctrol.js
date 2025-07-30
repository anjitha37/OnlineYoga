
const Class = require("../model/classmodel"); // You need to create this model
const mongoose = require("mongoose");
const Booking = require("../model/bookingmodel"); // Assuming you have this model
const User = require("../model/usermodel");
const Review = require('../model/reviewmodel')

// Add a new class
// In instructor controller
const addClass = async (req, res) => {
  try {
    const { className, date, time, duration, description, price, meetingLink } = req.body;
    const instructorId = req.userId;

    // Validation
    if (!className || !date || !time || !duration || !description || !price) {
      return res.status(400).json({ msg: "All fields are required." });
    }
    if (Number(duration) <= 0) {
      return res.status(400).json({ msg: "Duration must be positive." });
    }
    if (Number(price) <= 0) {
      return res.status(400).json({ msg: "Price must be greater than 0." });
    }

    const newClass = new Class({
      className,
      date,
      time,
      duration,
      description,
      price,
      instructorId,
      meetingLink
    });

    await newClass.save();
    res.status(201).json({ msg: "Class added successfully", newClass });
  } catch (error) {
    console.error("Error adding class:", error);
    res.status(500).json({ msg: "Server error adding class" });
  }
};


// Get all classes (for instructor or admin to view)
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ date: 1 });
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ msg: "Server error fetching classes" });
  }
};

// Get instructor profile by ID
const getInstructorProfile = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;

    if (!mongoose.Types.ObjectId.isValid(instructorId)) {
      return res.status(400).json({ message: "Invalid instructor ID format" });
    }

    // Find user with role 'instructor' and given ID
    const instructor = await User.findOne({ _id: instructorId, role: "instructor" }).select('-password');
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json(instructor);
  } catch (error) {
    console.error("Error fetching instructor profile:", error);
    res.status(500).json({ message: "Server error fetching instructor profile" });
  }
};



const getInstructorBookings = async (req, res) => {
  try {
    const instructorId = req.userId;

    // Find classes created by this instructor
    const classes = await Class.find({ instructorId });
    const classIds = classes.map(cls => cls._id);

    // Find bookings for these classes
    const bookings = await Booking.find({ instructorId: req.userId })
  .populate('user')
  .populate('class');


    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching instructor bookings:", error);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findByIdAndUpdate(bookingId, { status: 'cancelled' }, { new: true });
    if (!booking) return res.status(404).json({ msg: "Booking not found" });
    res.status(200).json({ msg: "Booking cancelled", booking });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ msg: "Server error cancelling booking" });
  }
};


// Approve or reject a booking
const respondToBooking = async (req, res) => {
  try {
    const instructorId = req.userId;
    const { bookingId } = req.params;
    const { action } = req.body; // 'confirm' or 'reject'

    if (!['confirm', 'reject'].includes(action)) {
      return res.status(400).json({ msg: "Invalid action. Use 'confirm' or 'reject'." });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    // Check instructor authorization
    if (booking.instructorId.toString() !== instructorId) {
      return res.status(403).json({ msg: "Unauthorized to update this booking" });
    }

    booking.status = action === 'confirm' ? 'confirmed' : 'rejected';
    await booking.save();

    res.status(200).json({ msg: `Booking ${action}ed successfully`, booking });

  } catch (error) {
    console.error("Error responding to booking:", error);
    res.status(500).json({ msg: "Server error responding to booking" });
  }
};


// Get classes added by the logged-in instructor
const getInstructorClasses = async (req, res) => {
  try {
    const instructorId = req.userId;

    const classes = await Class.find({ instructorId }).sort({ date: 1 });
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching instructor's classes:", error);
    res.status(500).json({ msg: "Server error fetching instructor classes" });
  }
};

// Update a class added by instructor
const updateClass = async (req, res) => {
  try {
    const instructorId = req.userId;
    const classId = req.params.id;
    const updates = req.body;

    const existingClass = await Class.findOne({ _id: classId, instructorId });

    if (!existingClass) {
      return res.status(404).json({ msg: "Class not found or unauthorized" });
    }

    const updatedClass = await Class.findByIdAndUpdate(classId, updates, {
      new: true,
    });

    res.status(200).json({ msg: "Class updated successfully", updatedClass });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ msg: "Server error updating class" });
  }
};

const getInstructorEarnings = async (req, res) => {
  try {
    const { id } = req.params;

    // Get all confirmed bookings for this instructor
    const bookings = await Booking.find({ status: 'confirmed' })
      .populate('class')
      .populate('user');

    const instructorBookings = bookings.filter(b => b.class && b.class.instructorId.toString() === id);

    let totalEarnings = 0;
    let totalAttendance = instructorBookings.length;

    const weeklyIncome = {};
    const monthlyIncome = {};
    const classSet = new Set();

    instructorBookings.forEach(b => {
      if (!b.class || !b.class.date || !b.class.price) return;

      const classDate = new Date(b.class.date);
      const week = `W${getWeekNumber(classDate)}`;
      const month = classDate.toLocaleString('default', { month: 'short' });

      totalEarnings += b.class.price;
      classSet.add(b.class._id.toString());

      weeklyIncome[week] = (weeklyIncome[week] || 0) + b.class.price;
      monthlyIncome[month] = (monthlyIncome[month] || 0) + b.class.price;
    });

    const formatChartData = (dataObj, label) =>
      Object.entries(dataObj).map(([key, value]) => ({ [label]: key, amount: value }));

    res.json({
      totalEarnings,
      weeklyIncome: formatChartData(weeklyIncome, 'week'),
      monthlyIncome: formatChartData(monthlyIncome, 'month'),
      classCount: classSet.size,
      totalAttendance
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error fetching earnings' });
  }
};

// Helper: Week number from date
function getWeekNumber(date) {
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor((date - firstJan) / 86400000);
  return Math.ceil((pastDays + firstJan.getDay() + 1) / 7);
}

// GET reviews for classes by this instructor
const getReviewsForInstructor = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;

    // Get all classes of this instructor
    const classes = await Class.find({ instructorId });
    const classIds = classes.map(cls => cls._id);

    // Get reviews for these classes
    const reviews = await Review.find({ classId: { $in: classIds } })
      .populate('classId')
      .populate('userId');

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching instructor reviews:", err);
    res.status(500).json({ msg: "Server error fetching reviews" });
  }
};

// POST reply to a review
const replyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reply } = req.body;

    const review = await Review.findById(reviewId).populate('classId');
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    // Check if logged-in instructor owns the class
    if (review.classId.instructorId.toString() !== req.userId) {
      return res.status(403).json({ msg: "Unauthorized to reply to this review" });
    }

    review.reply = reply;
    await review.save();

    res.status(200).json({ msg: "Reply added successfully", review });
  } catch (err) {
    console.error("Error replying to review:", err);
    res.status(500).json({ msg: "Server error replying to review" });
  }
};

module.exports = { addClass, getAllClasses, getInstructorProfile, getInstructorBookings,cancelBooking,getInstructorClasses, updateClass,respondToBooking,getInstructorEarnings,getReviewsForInstructor , replyToReview};
