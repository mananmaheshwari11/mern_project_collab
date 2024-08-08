import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const RequireSignIn=async(req,res,next)=>{
    const signed_user=jwt.verify(req.header.authorization,process.env.JWT_SECRET)
    req.user=signed_user
    next();
}