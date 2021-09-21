import FolderModel from '../models/Folder';
import  NoteModel  from '../models/Note';

import { NextFunction, Request , Response} from 'express';

class HomeController{
  
  public redirectMyDrive = async function(req:any , res :Response , next : NextFunction){
      return res.redirect('/mydrive')
  }
  public getMyDrive = async function (req : any, res:Response , next:NextFunction){
    try{
      const userId = res.locals.user._id;
      const user =res.locals.user;
      const folders = await FolderModel.find({user_id : userId , folder_id : '000000000000000000000000' }).sort({createdAt : -1});
      const notes = await NoteModel.find({user_id : userId , folder_id : '000000000000000000000000' }).sort({createdAt : -1});
      const recentNotes = await NoteModel.find({user_id : userId , folder_id : '000000000000000000000000' }).sort({updatedAt : -1});
      

      return res.render('pages/index' , {folders , notes ,recentNotes, user})
    }catch(error){
      req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again!`}}
      res.redirect('/auth/logout')
      return next(error);
    }
  } 
}



const homeController = new HomeController();
export default homeController;