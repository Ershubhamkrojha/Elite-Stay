import crypto from 'crypto';
import dotenv from "dotenv";
import { createError } from "../util/error.js"
import { instance } from "../../server.js"
import { createRoomBooking } from "../controlers/roombooked.js"
import { getUserIdFromToken } from "../controlers/roombooked.js"
import Roombooked from '../../models/RoomBooked.js';
import User from '../../models/User.js';
import jwt from "jsonwebtoken";

let newRoomNum;
let newRoomId;

dotenv.config();

// // let user_Id;

export const getKey = async (req, res, next) => {
    try {

        return res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
    } catch (error) {
        next(error)
    }
};

export const checkOut = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { roomId, amount, roomNum } = req.body;

        newRoomNum = roomNum;
        newRoomId = roomId;



        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            // receipt: "order_rcptid_11",
        };

        const order = await instance.orders.create(options);

        res.status(200).json({
            order,
        });
    } catch (error) {
        next(error)
    }
};


export const paymentVerification = async (req, res, next) => {
    try {

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, room_Id } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id
        const generated_signature = crypto

            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAthenticate = generated_signature === razorpay_signature;
        if (isAthenticate) {
            const token = req.cookies.access_token;
            // console.log(token)
            if (!token) {
                return next(createError(401, "You are not authenticated"))
            }

            const userId = await getUserIdFromToken(token);
            console.log(userId)
            let roomId = newRoomId;
            let roomNo = newRoomNum;


            const payload = {
                roomId,
                userId,
                roomNo,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            };
            console.log(payload)

            const bookingDetails = await createRoomBooking(payload);
            console.log(bookingDetails)
            await User.findByIdAndUpdate(
                bookingDetails.userId,
                {
                    $push: { bookingDetails: bookingDetails._id },
                },
                { new: true }
            );


            
            res.redirect(
                `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
            );
            res.status(200).json({
                success: true,
            });

        } else {
            res.status(400).json({
                success: false,
            });
        }
    } catch (error) {
        next(error)

    }
};


