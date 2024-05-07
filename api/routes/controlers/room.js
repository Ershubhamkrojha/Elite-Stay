import Room from "../../models/Room.js"
import Hotel from "../../models/Hotel.js"
import { createError } from "../util/error.js"
import { createRoomBooking } from './roombooked.js'

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error)
    }
}
export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Hotel.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json(updateRoom)

    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}
export const updateRoomAvailability = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const room = await Room.updateOne(
            { "roomNumber._id": req.params.id },
            {
                $push: {
                    "roomNumber.$.unavilableDates": req.body.dates
                },
            }
        ); // console.log(room)
        res.status(200).json("Room status has been updates.")
    } catch (error) {
        next(error)
    }
}
export const deleteRoom = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Hotel has been deleteted");

    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(
            req.params.id
        );
        res.status(200).json(room)


    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}
export const getAllRoom = async (req, res, next) => {

    try {

        const rooms = await Room.find();
        res.status(200).json(rooms)

    } catch (error) {
        // res.sendStatus(500).json(error);
        next(error)
    }
}
