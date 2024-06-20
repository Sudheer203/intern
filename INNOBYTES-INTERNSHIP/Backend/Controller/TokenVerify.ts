import { Request,Response,NextFunction } from "express";
import jwt, { decode } from 'jsonwebtoken'


const VerifyToken = (req:any, res:Response , next:any) =>{
    const token = req.cookies.token
    console.log(token)

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized Login Frist"
        })
    }

    jwt.verify(token , "HardikHardik" , (err:any,decode:any)=>{
         if(err){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Login Frist"
            })
         }
         req.decode = decode
    })
    next()


}

export default VerifyToken