import FolderModel from '../models/Folder';
import  NoteModel  from '../models/Note';
import { NextFunction, Request , Response} from 'express';

class NoteController{
  
  public postFolder = async function(req : Request, res:Response , next:NextFunction){

    try{
      const folder = {
        name : req.body.name,
        user_id : res.locals.user._id
      }
      
      const newFolder = new FolderModel(folder);
      await newFolder.save();
      req.flash('success' , 'Folder created successfully')
      res.redirect('/')

    }catch(err){
      req.flash('success' , 'Sorry, an error happened')
      res.redirect('back')
    }
    
  }

  public getAllFolder = async function (req : Request, res:Response , next:NextFunction){
    try{

    }catch(err){
      
    }
  } 

}



const noteController = new NoteController();
export default noteController;