import express from "express";
import dotenv from "dotenv";
import mongoose, { Error } from "mongoose";
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import roomRoute from './routes/room.js'
import hotelsRoute from './routes/hotels.js'
import bookingRoute from './routes/bookingRoute.js'
import cookieParser from "cookie-parser";
import cors from 'cors';
import Razorpay from "razorpay"
import paymentRoute from './routes/paymentRoutes.js'


// import register from './routes/auth.js'
dotenv.config();
const app = express();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

//cconnection to mongodb
const connect = async () => {
  try {

    await mongoose.connect(process.env.Mongo).then(() => { console.log("conected to mongoDb") })


    // await mongoose.connect(process.env.Mongo)
    //   console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("disconected!")
});
mongoose.connection.on("Conected", () => {
  console.log("Mongo db connected");
});

// app.use(cors({
//   origin:'http://localhost:3000'
// }));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))


// midle ware for route


app.use(express.json())
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/rooms', roomRoute);
app.use('/booking', bookingRoute);
app.use('/hotels', hotelsRoute);
app.use('/payment', paymentRoute)

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500
  const errorMsg = error.message || "Somthing is wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: error.stack,
  })

  // return res.status(500).json("error find in page", Error)
})


//connection or port 

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connect();
  console.log("Server started...", port);
});
// const port = process.env.PORT || 5000; // Use 8080 from .env or default to 5000

// app.listen(port, () => {
//   connect();
//   console.log(`Server started on port ${port}`);
// });
