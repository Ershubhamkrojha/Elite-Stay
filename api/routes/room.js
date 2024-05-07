import express from 'express';
import { verifyAdmin, verifyUser } from './util/verifyToken.js';
import {createRoom,updateRoom ,deleteRoom,getRoom,getAllRoom,updateRoomAvailability} from './controlers/room.js'

const router=express.Router();
//create path
router.post("/:hotelid",verifyAdmin, createRoom);
//console.log("post method"); 
//update  
router.put("/:id",verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)
//delete
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

//get 
router.get("/:id", getRoom)
//getall
router.get("/", getAllRoom);


//Room status



export default router;