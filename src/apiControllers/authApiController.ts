import UserModel from '../models/user'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
class AuthApiController{


  public postLogin = async (req : any , res:any , next:any)=>{
    try{
      const {email, password , remember} = req.body;

      const user =await UserModel.findOne({email : email}) ;
      if(user){
        const isMatch = await user.comparePassword(password);
        if(isMatch){
          
          const token = jwt.sign({ id: user._id }, `${process.env.PRIVATE_KEY}` , {
            expiresIn : 60 * 60 * 24
          });
          
          return res.json({result : 1 ,auth :true , msg : "Usuario encontrado" , token })

        }  
        return res.json({result : 0 , msg : "Password incorrecto"})
      }
      return res.json({result : 0 , msg : "Email incorrecto"})
    }catch(error){
      console.log(error)
    }
  }


  public postRegister = async function( req : any , res : any , next:any){
    try{
      const user= await UserModel.create({
        email : req.body.email,
        password : req.body.password,
        fullname : req.body.fullname
      })
      
      const token = jwt.sign({ id: user._id }, `${process.env.PRIVATE_KEY}` , {
        expiresIn : 60 * 60 * 24
      });

      return res.json({result : 1 ,auth :true , msg : "You registered a user successfully" , token });
  
    }catch(error:any){
      console.log(error)

      if(error.name == "ValidationError"){
        if(error.errors['email']){
          return res.json({result : 0 ,auth :false , msg : "Email : " + error.errors['email'].message })
        }
        
        return res.json({result : 0 ,auth :false , msg : "Validation Error" })
      }
    }
  
  }

  public postForgotPassword =  async(req:Request , res : Response)=>{
    try{
      const {email} = req.body
      let user:any = await UserModel.findOne({email : email})
      
      if(!user){
        res.status(400).json({msg : "An error ocurred"})
      }

      const resetToken = jwt.sign({id:user._id , email : user.email} , `${process.env.SECRET_RESET}` , {
        expiresIn : 60 * 60 
      })

      const verificationLink = `http://localhost:8080/api/auth/new-password/${resetToken}`
      await user.updateOne( {resetToken : resetToken})

      res.status(200).json({verificationLink})

    }catch(error){
      console.log(error)
    }
  }
  

  public postNewPassword = async (req:Request , res :Response)=>{
    try{
      const resetToken:any = req.headers['reset']
      const {password} = req.body
      
      if(!resetToken){
        res.status(400).json({msg : "An error ocurred"})
      }

      const decoded:any = jwt.verify(resetToken , `${process.env.SECRET_RESET}`)
      let user:any = await UserModel.findById(decoded.id)
      if(!user){
        res.status(400).json({msg : "An error ocurred"})
      }
      
      const newPassword = await user.encryptPassword(password);
      await user.updateOne({password : newPassword})
      res.status(200).json({msg : "Se logro"})
    }catch(error){
      res.status(400).json({msg : error})
    }
  }



}

const authApiController = new AuthApiController();
export default authApiController;