import Hotel from '../../models/Hotel.js'
import Room from '../../models/Room.js'
import { createError } from '../util/error.js'
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)

    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }

}
export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json(updateHotel)

    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}
export const deleteHotel = async (req, res, next) => {
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
export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(
            req.params.id
        );
        res.status(200).json(getHotel)


    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}
export const getAllHotel = async (req, res, next) => {
    // console.log('Query Parameters:', req.query);

    const { min, max, limit, ...others } = req.query;
    try {
        const hotels = await Hotel.find({ ...others, cheapestPrices: { $gt: min || 1, $lt: max || 10000, }, }).limit(limit);
        res.status(200).json(hotels)

    } catch (error) {
        // res.sendStatus(500).json(error);
        next(error)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            // return Hotel.find({city:city}).length
            return Hotel.countDocuments({ city: city })
        }))

        res.status(200).json(list)
    } catch (error) {
        // res.sendStatus(500).json(error);
        next(error)
    }
}
export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const VillaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })


        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: VillaCount },
            { type: "cabin", count: cabinCount },
        ])
    } catch (error) {
        // res.sendStatus(500).json(error);
        next(error)
    }

}
export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        // console.log(hotel);

        const list = await Promise.all(hotel.rooms.map(async room => {
            // Check if the room ID is not an empty string
            if (room) {
                try {
                    const roomData = await Room.findById(room);
                    return roomData;
                } catch (error) {
                    next(error)
                }
            } else {

                return null;
            }
        }));


        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};
