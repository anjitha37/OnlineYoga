const express=require('express')
const { loginUser, registerUser,getAllClasses, getClassById,upload, createBooking,getUserBookings,cancelBooking, getUserProfile, createReview, getReviewsByUser, getBookedClassesForReview }=require('../controller/userctrol')


const userRouter=express.Router()

userRouter.post('/registeruser',upload.single("certificate"), registerUser)
userRouter.post('/loginuser',loginUser)
userRouter.get("/classes", getAllClasses)
userRouter.get("/classes/:id",getClassById)
userRouter.post('/bookings/book', createBooking);
userRouter.get('/bookings/:userId', getUserBookings);
userRouter.put('/cancel/:bookingId', cancelBooking);
userRouter.get('/profile/:userId',getUserProfile)
userRouter.post('/reviews',createReview);
userRouter.get('/user/:userId',getReviewsByUser);
userRouter.get('/bookings/user/:userId/classes', getBookedClassesForReview);
module.exports=userRouter;