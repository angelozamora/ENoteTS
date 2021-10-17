import UserModel from '../models/user'
import jwt from 'jsonwebtoken';
import { NextFunction, Request , Response} from 'express';
export async function verifyToken(req:any , res:Response,  next:NextFunction){
  try{

    const token = req.headers['access-token']
    if(!token){
      return res.status(400).json({result : 0 ,auth :false , msg : "No token provided" })
    }
  
    let decoded:any = jwt.verify( `${token}`, `${process.env.PRIVATE_KEY}`); 
    req.userId = decoded.id;
    next()
    
  }catch(error){
    return res.status(400).json({result : 0 ,auth :false , msg : error })
  }
}
