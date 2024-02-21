import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/features.js"
import HandleError from "../middlewares/error.js"

export const register = async (req, res,next)=>{
    try {
        const { name , email, password } = req.body
    let user = await User.findOne({email})

    if(user) return next(new HandleError("Email Already Exists!",403))

    else{
        const hashedPass = await bcrypt.hash(password,10)
        user = await User.create({name,email ,password: hashedPass})

        sendCookie(user,res,"Registered Successfully.",201)
    }
    } catch (error) {
        next(error)
    }
}

export const login = async (req,res,next)=>{
    try {
        const { email, password } = req.body
    let user = await User.findOne({email}).select("+password")

    if(!user) return next(new HandleError("Invalid Email or Password",403))

    const isMatch = await bcrypt.compare(password, user.password )

    if(!isMatch)return next(new HandleError("Invalid Email or Password",403))

    // sendCookie(user, res , `Welcome ${user.name}`, 200)
    // } 
    
    res.cookie("token", token,{
        expires: 36000000000,
        httpOnly:true,
    })

    catch (error) {
        next(error)
    }

}

export const logout = (req, res )=>{

    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite : process.env.NODE_ENV==="DEVELOPMENT"? "lax" : "none",
    secure: process.env.NODE_ENV==="DEVELOPMENT"? false : true,
    })
    .json({
        message:"Logout Successful!",
    })
}

export const getMyProfile = (req,res)=>{

    try {
         res.status(200).json({
        user: req.user,
    })
    } catch (error) {
        next(error)
    }
   
}

