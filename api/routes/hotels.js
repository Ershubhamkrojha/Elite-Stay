import express from 'express';
import Hotel from '../models/Hotel.js';
import { createError } from './util/error.js';
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel,countByCity,countByType ,getHotelRooms} from './controlers/hotel.js'
import { verifyAdmin, verifyUser } from './util/verifyToken.js';
const router = express.Router();

//create path
router.post("/",verifyAdmin, createHotel);
//console.log("post method"); 
//update  
router.put("/:id",verifyAdmin, updateHotel)
//delete
router.delete("/:id",verifyAdmin, deleteHotel)

//get 
router.get("/:id", getHotel)
//getall
router.get("/", getAllHotel);
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);
router.get("/room/:id",getHotelRooms);


export default router;