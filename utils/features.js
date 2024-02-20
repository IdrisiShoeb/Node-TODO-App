import jwt from "jsonwebtoken"


export const sendCookie=(user,res,msg,statusCode)=>{
    const token = jwt.sign({_id: user._id } , process.env.JWT_SECRET)

        res.status(statusCode).cookie('token',token , {
            // can only be accessed by server requests
            httpOnly: true,
            // path = where the cookie is valid
            path: "/",
            // secure = only send cookie over https
            secure: true,
            // sameSite = only send cookie if the request is coming from the same origin
            sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
            // maxAge = how long the cookie is valid for in milliseconds
            maxAge: 3600000, // 1 hour
          }).json({
            success:true,
            message: msg
        })
}