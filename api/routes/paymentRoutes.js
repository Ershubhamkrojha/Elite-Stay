import express from 'express';
import { checkOut,paymentVerification,getKey } from './controlers/payment.js';
const router=express.Router();

router.get("/getkey", getKey)
    
router.post("/checkout",checkOut)
router.post("/paymentverification",paymentVerification)

export default router;