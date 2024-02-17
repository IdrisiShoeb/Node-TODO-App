
class HandleError extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

export const ErrorHandler  = (err,req,res,next)=>{
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export default HandleError