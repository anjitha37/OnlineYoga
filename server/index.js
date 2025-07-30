const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const userRouter=require('./routes/userrouter')
const adminRouter = require('./routes/adminrouter')
const instructorRouter = require('./routes/instructorrouter')
const bookingRouter = require('./routes/bookingrouter')
const path = require('path');

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const dbConnect=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/yoga")
        console.log("Database connected successfully")
    }catch(err){
        console.log("Error occured",err)
    }
}

dbConnect()

app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/instructor',instructorRouter)
// app.use('/uploads', express.static('uploads'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/bookings',bookingRouter)


app.listen(9001,()=>{
    console.log("Server Started Successfully")

})