import  UserModel  from '../models/user'
import { NextFunction, Request , Response} from 'express';



class AuthController{
  

  public getLogin = function ( req:Request , res :Response ){
    res.render('auth/login')
  }

  public postLogin = async  function( req : Request , res :  Response, next : any){
    try{
      const {email, password , remember} = req.body;

      const user =await  UserModel.findOne({email : email}) ;
      if(user){
        const isMatch = await user.comparePassword(password);
        if(isMatch){
          if(req.session){
            req.session.userId = user._id;
            
            // req!.session!.user = user;
            req.flash('succes', 'Usuario correcto');
            res.redirect('/')
          }
        }else{
          req.flash('errors', ' Password is invalid');
          res.redirect('back')
        }
      }
      else{
        req.flash('errors', 'User not found , try again!');
        res.redirect('back')
      }
  
    }catch(err){
      return next(err); 
    }
  
  }
  
  public getRegister =  function ( req : Request , res : Response ){
    res.render('auth/register')
  }
  
  public postRegister = async function( req : Request , res : Response , next:any){
    try{
      
      // const {email , password }=req.body;
      // console.log("EMAIL : "+email)
      const user= await UserModel.create({
        email : req.body.email,
        password : req.body.password,
        fullname : req.body.fullname
      })
      
      res.redirect('/login');
  
  
    }catch(err){
      if(err.name == "ValidationError"){
        res.render('pages/register' , {errors : err.errors})
      }
      return next(err);
    }
  
  }
  
  public postLogout = async function( req : Request , res: Response , next : NextFunction){
    req.session = null  
    res.clearCookie('prueba');
    res.clearCookie('express:sess.sig')
    res.clearCookie('express:sess')
      
    res.redirect('/login')
  }
}


const authController = new AuthController();
export default authController;





