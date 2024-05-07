import jwt from "jsonwebtoken";
import { createError } from "./error.js";


//veryfy authentication
export const verifyToken = async (req, res, next) => {
    try {
        // check auth js cookies check token avilable or not if not then return error 
        const token = req.cookies.access_token;
    

        if (!token) {
            return next(createError(401, "You are not authenticated"))
        }
        // console.log(token);
        //veryfy the token veryfy is the function for use verify the token
        //return information after authenticate
        const tokenData = jwt.verify(token, process.env.JWT);
        if (!tokenData) {
            // throw error
        }

        req.userId = tokenData.id;
       
        req.role = tokenData.role;
    
        
        next();
    } catch (error) {
        //handle any error
        return res.status(401).send({
            msg: "Token Expired"
        })
    }
}

//veryfi User

export const verifyUser = (req, res, next) => {
    verifyToken(req, res,() => {

        if (req.userId === req.params.id || req?.role === 'ADMIN') {
           
            next()
        }
        else {
            if (error) 
            return next(createError(403, "you are not authorized"));
        }
    })
    // console.log(req.userId)
    // // console.log("hi")
    // console.log(req.role)
    // console.log("hii")
}
//veryfy admin
// export const verifyAdmin = (req, res, next) => {
//     if (req?.role === 'ADMIN') {
//         console.log(req?.role);
//         next();
//     } else {

//         console.log(req.role);
//         next(createError(403, "you are not admin"));
//     }


// }
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req?.role === 'ADMIN') {
            next();
         }
        else {
             return next(createError(403, "you are not admin"));
        }
    })


}