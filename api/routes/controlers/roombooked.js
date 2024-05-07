import Roombooked from "../../models/RoomBooked.js"
import jwt from "jsonwebtoken";
import { createError } from '../util/error.js'
let userId;

export const getUserIdFromToken = (token) => {
    const tokenData = jwt.verify(token, process.env.JWT);
    userId = tokenData.id;
    return userId;
}

export const createRoomBooking = async (payload ) => {
    try {
        console.log(payload)
        const {roomId,userId, roomNo, razorpay_order_id, razorpay_payment_id, razorpay_signature } = payload;
        console.log("Received payload:", payload); // Log the received payload
        console.log("roomId:", roomId); // Log the roomId
        console.log("roomNo:", roomNo); // Log the roomNo

        const newBooking = new Roombooked({
            roomId,
            userId,
            roomNo,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        const savedBooking = await newBooking.save();
        return savedBooking;
    } catch (error) {
        console.error("Error in createRoomBooking:", error); // Log the error message
        throw createError(500, "Internal Server Error");
    }
};





export const updateRoomBooking = async (req, res, next) => {
    try {
        const { roomid, userid, bookingstatus } = req.body;
        const bookingId = req.params.id;
        const updatedBooking = await Roombooked.findByIdAndUpdate(
            bookingId,
            { roomid, userid, bookingstatus },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        next(error);
    }
};
export const deleteRoomBooking = async (req, res, next) => {
    try {
        await Roombooked.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("booking has been deleteted");

    } catch (error) {

        next(error)
    }
}

export const getbookingRoom = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const roomBooking = await Roombooked.find({ userid: userId });
        const { bookingstatus, roomid } = roomBooking;

        res.status(200).json(roomBooking);

        if (!roomBooking) {
            return res.status(404).json({ message: "No booking found for this user" });
        }


    } catch (error) {
        next(error);
    }
}
