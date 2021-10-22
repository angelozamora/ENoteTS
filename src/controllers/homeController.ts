import { NextFunction, Request , Response} from 'express';
import { managmentError } from '../loaders/error';
import { getDrive } from '../services/Folder/UseCase/getDrive';

class HomeController{
  
  public redirectMyDrive = async function(req:any , res :Response , next : NextFunction){
      return res.redirect('/mydrive')
  }
  public getMyDrive = async function (req : any, res:Response , next:NextFunction){
    try{
      const userId = res.locals.user._id;
      const user =res.locals.user;
      let result = await getDrive(userId)
      return res.render('pages/index' , {...result,user})

    }catch(error){
      managmentError(error, req, res)
    }
  } 
}



const homeController = new HomeController();
export default homeController;