import express from 'express';
import {updateUser,deleteUser,getUser,getAllUser} from './controlers/user.js'
 import { verifyToken} from './util/verifyToken.js'
 import { verifyUser} from './util/verifyToken.js'
 import {verifyAdmin} from './util/verifyToken.js'
const router=express.Router();

// veryfi token
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user, You are logged in ")
// }) 
//check user in the data or not

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user ,You are logged in and You can delet your Account");
// })
// // check admin or not route path
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello user ,You are logged in and You can delet All Account");
//     // console.log(req.user.role)
// }) 
//create path
//update   
router.put("/:id",verifyUser,updateUser)
//delete
router.delete("/:id",verifyUser,deleteUser)

// router.get('/for-admin/:id',verifyAdmin,verifyToken,(req,res,next) => {
//     res.send("Hello, this is admin");
// })

// router.get('/for-user',verifyToken,(req,res,next)=>{
//     res.send("hello user ,You are logged in and You can delet your Account");
// })

//get 
router.get("/:id",verifyUser,getUser)
//getall
router.get("/",verifyAdmin, getAllUser)

// //update   
// router.put("/:id",verifyUser, updateUser)
// //delete
// router.delete("/:id",verifyAdmin, deleteUser)

// //get 
// router.get("/:id",verifyUser ,getUser)
// //getall
// router.get("/", verifyAdmin,getAllUser)
 
 

export default router;  