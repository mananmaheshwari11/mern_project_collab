import jwt from 'jsonwebtoken'

export const RequireSignIn=async(req,res,next)=>{
    const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
    req.user= decode;
    next();
}

// export const requireSignin=async(req,res,next)=>{
    
// }
