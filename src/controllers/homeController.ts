import FolderModel from '../models/Folder';

import { NextFunction, Request , Response} from 'express';

class HomeController{
  

  public getAllFolders = async function (req : any, res:Response , next:NextFunction){
    try{
      const userId = res.locals.user._id;;
      const folders = await FolderModel.find({user_id : userId}).sort({createdAt : -1});
      return res.render('pages/index' , {folders})
    }catch(err){
      req.flash("res" , {type : 'error' ,  msg: 'An error occurred, please try again!' })
      res.redirect('back')
      return next();
    }
  } 

}



const homeController = new HomeController();
export default homeController;