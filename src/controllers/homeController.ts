import FolderModel from '../models/Folder';

import { NextFunction, Request , Response} from 'express';

class HomeController{
  

  public getAllFolders = async function (req : Request, res:Response , next:NextFunction){
    try{
      const userId = res.locals.user._id;;
      const folders = await FolderModel.find({user_id : userId});
      res.render('pages/index' , {folders})
    }catch(err){
      next();
    }
  } 

}



const homeController = new HomeController();
export default homeController;