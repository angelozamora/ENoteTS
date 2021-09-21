import  UserModel  from '../models/user';
import { NextFunction, Request , Response} from 'express';




class AuthController{
  

  public getLogin = function ( req:Request , res :Response ){
    res.render('auth/login')
  }

  public postLogin = async  function( req : any , res :  Response, next : any){
    try{
      const {email, password , remember} = req.body;

      const user =await  UserModel.findOne({email : email}) ;
      if(user){
        const isMatch = await user.comparePassword(password);
        if(isMatch){
          if(req.session){
            req.session.userId = user._id;
            // req!.session!.user = user;
            req.session['message'] = {res : { type : 'success' , msg:`Welcome  ${user.fullname}`}} 
            return res.redirect('/mydrive')
          }
        }else{
          req.session['message'] = {res : { type : 'error' , msg:`Password is invalid , try again!`}} 
          return res.redirect('back')
        }
      }
      else{
        req.session['message'] = {res : { type : 'error' , msg:`User not found , try again!`}}
        return res.redirect('back')
      }
  
    }catch(error){
      req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again!`}}
      res.redirect('back')
      return next(error); 
    }
  
  }
  
  public getRegister =  function ( req : Request , res : Response ){
    res.render('auth/register')
  }
  
  public postRegister = async function( req : any , res : Response , next:any){
    try{
      
      const user= await UserModel.create({
        email : req.body.email,
        password : req.body.password,
        fullname : req.body.fullname
      })
      
      req.session['message'] = {res : { type : 'success' , msg:`You registered a user successfully`}}
      return res.redirect('/auth/login');
  
    }catch(error:any){
      if(error.name == "ValidationError"){
        return res.render('auth/register' , {errors : error.errors})
      }
      
      console.log('holaa')
      req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again!`}}
      return next(error);
    }
  
  }
  
  public postLogout = async function( req : Request , res: Response , next : NextFunction){
    req.session = null  
    res.clearCookie('prueba');
    res.clearCookie('express:sess.sig')
    res.clearCookie('express:sess')
      
    res.redirect('/auth/login')
  }
}


const authController = new AuthController();
export default authController;





