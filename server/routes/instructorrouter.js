const express = require('express');
const router = express.Router();
const { addClass, getAllClasses, getInstructorProfile, getInstructorBookings, getInstructorClasses, updateClass, respondToBooking, getInstructorEarnings, getReviewsForInstructor, replyToReview} = require('../controller/instructorctrol');
const { cancelBooking } = require('../controller/userctrol');
const verifyInstructor = require('../middleware/verifyInstructor');


router.post('/addclass',verifyInstructor, addClass);
router.get('/classes', getAllClasses);
router.get('/profile/:instructorId', getInstructorProfile);
router.get('/bookings',verifyInstructor, getInstructorBookings);
router.patch('/bookings/cancel/:id', cancelBooking);
router.get('/myclasses',verifyInstructor,getInstructorClasses);
router.put('/updateclass/:id', verifyInstructor, updateClass);
router.put('/bookings/respond/:bookingId',verifyInstructor,respondToBooking);
router.get('/earnings/:id',verifyInstructor,getInstructorEarnings);
router.get('/reviews/:instructorId',verifyInstructor,getReviewsForInstructor);
router.post('/reviews/reply/:reviewId',verifyInstructor,replyToReview);

module.exports = router;
