import express from 'express';
import { verifyAdmin, verifyUser } from './util/verifyToken.js';
import { createRoomBooking, deleteRoomBooking, updateRoomBooking,getbookingRoom } from './controlers/roombooked.js';
const router=express.Router();

// router.post('/', createRoomBooking);
// router.put('/:id',verifyAdmin,updateRoomBooking);
// router.delete('/:id',verifyAdmin,deleteRoomBooking)
 router.get("/:userid",verifyUser, getbookingRoom)

export default router;