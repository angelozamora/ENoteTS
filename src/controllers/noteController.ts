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
      if(err.name === "ValidationError"){
        req.flash('success' , 'Email '+err.errors.name.message)
      }else{
        req.flash('success' , 'Sorry, an error happened')
      }
      res.redirect('back')
    }
    
  }
  
  public getAllNotes = async function(req : Request, res:Response , next:NextFunction){
    try{

      const folderId = req.params.id;
      const notes = await FolderModel.find({folder_id : folderId})
      res.render('pages/allNotes' , {notes})
    }catch(err){
      next()
    }

  }



}



const noteController = new NoteController();
export default noteController;