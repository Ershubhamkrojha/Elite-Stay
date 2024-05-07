import User from '../../models/User.js'
import { createError } from '../util/error.js'
//bcrypt use for security purpose of password
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
export const register = async (req, res, next) => {
    try {
        //in in  stall bcryptjs Security considerations and call
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("User has been created")
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found"))
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password);
        if (!isPasswordCorrect) return next(createError(404, "Wrong Password"));
        //create token for authentication check admin or user
        //install jsonwebtoken
        // console.log(user)
        const payload = {
            id: user._id,
            role: user.role

        }
        const token = Jwt.sign(payload, process.env.JWT, { expiresIn: '24h' });
        //destructure the user passwor admin 
        const { password, role, ...otherDetails } = user._doc;
        //use for clint   In this code, after generating the token and before sending the response, you're using the res.cookie method to set the "access_token" cookie with the generated token. The httpOnly: true option ensures that the cookie is only accessible through HTTP requests and not by JavaScript running in the browser.
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ ...otherDetails });
    } catch (error) {
        next(error)
    }
}