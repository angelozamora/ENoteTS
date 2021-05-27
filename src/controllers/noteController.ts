import FolderModel from '../models/Folder';
import  NoteModel  from '../models/Note';
import { NextFunction, Request , Response} from 'express';
import Folder from '../models/Folder';

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

      const folderId = req.params.folderId;
      const folder = await Folder.findOne({ _id : folderId})
      if(folder){
        const notes = await NoteModel.find({folder_id : folderId})
        res.render('pages/allNotes' , {notes , folder})
      }else{
        console.log('no existe folder')
        return res.redirect('back')
      }
      
    }catch(err){
      next(err)
    }

  }


  public getCreateNote = async function(req : Request, res:Response , next:NextFunction){
    try{
      const folderId = req.params.folderId;
      const folder = await Folder.findOne({ _id : folderId})
      if(folder){
        res.render('pages/createNote' , {folder})
      }else{
        res.redirect('back')
      }

    }catch(err){
      next(err)
    }
    
  }

  public postCreateNote = async function(req : Request, res:Response , next:NextFunction){
    try{
      const folderId = req.body.folderId;
      const folder = await FolderModel.findOne({_id : folderId})
      if(folder){
        const note = {
          title : req.body.title,
          body : req.body.body,
          folder_id : folderId
        }

        const newNote = new NoteModel(note);
        await newNote.save()
      }else{
        res.redirect('back')
      }


    }catch(err){
      if(err.name == "ValidationError"){
        res.render('pages/createNote' , {errors : err.errors})
      }

    }
  }



}



const noteController = new NoteController();
export default noteController;