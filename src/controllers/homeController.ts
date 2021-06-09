import FolderModel from '../models/Folder';

import { NextFunction, Request , Response} from 'express';
import flash from 'express-flash';

class HomeController{
  
  public getMyUnit = async function(req:any , res :Response , next : NextFunction){
    try{
      return res.redirect('/mydrive')
    }catch(error){
      return next(error);
    }
  }
  public getAllFolders = async function (req : any, res:Response , next:NextFunction){
    try{
      console.log('entro a folders')
      const userId = res.locals.user._id;;
      const folders = await FolderModel.find({user_id : userId}).sort({createdAt : -1});
      return res.render('pages/index' , {folders})
    }catch(error){
      req.flash("res" , {type : 'error' ,  msg: 'An error occurred, please try again!' })
      res.redirect('back')
      return next(error);
    }
  } 

}



const homeController = new HomeController();
export default homeController;