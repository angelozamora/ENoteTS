import FolderModel from '../models/Folder';
import  NoteModel  from '../models/Note';
import { NextFunction, Request , Response} from 'express';
import Folder from '../models/Folder';

class NoteController{
  
  public postFolder = async function(req : any, res:Response , next:NextFunction){

    try{
      const folder = {
        name : req.body.name,
        user_id : res.locals.user._id
      }
      
      const newFolder = new FolderModel(folder);
      await newFolder.save();

      req.flash('res' , { type : 'success' , msg:'Folder created successfully'})
      return res.redirect('back')

    }catch(error){
      if(error.name === "ValidationError"){
        req.flash('res' , { type : 'error' , msg:'You must enter all the data'})
      }else{
        req.flash('res' , { type : 'error' , msg:'An error occurred, please try again'})
      }

      res.redirect('back')
      return next(error)
    }
    
  }
  
  public getAllNotes = async function(req : any, res:Response , next:NextFunction){
    try{

      const folderId = req.params.folderId;
      const folder = await Folder.findOne({ _id : folderId})
      if(folder){
        const notes = await NoteModel.find({folder_id : folderId})
        return res.render('pages/allNotes' , {notes , folder})
      }
      
      return res.redirect('back')
      
    }catch(error){
      req.flash('res' , { type : 'error' , msg:'An error occurred, please try again'})
      res.redirect('back')
      return next(error)
    }

  }


  public getCreateNote = async function(req : any, res:Response , next:NextFunction){
    try{
      const folderId = req.params.folderId;
      const folder = await Folder.findOne({ _id : folderId})
      if(folder){
        return res.render('pages/createNote' , {folderId})
      }
      
      req.flash('res' , { type : 'error' , msg:'Folder not found'})
      return res.redirect('back')
      

    }catch(error){
      req.flash('res' , { type : 'error' , msg:'An error occurred, please try again!'})
      res.redirect('back');
      return next(error);
    }
    
  }

  public postCreateNote = async function(req : any, res:Response , next:NextFunction){
    try{
      const folderId = req.params.folderId;
      const folder = await FolderModel.findOne({_id : folderId})
      if(folder){
        const note = {
          title : req.body.title,
          body : req.body.body,
          folder_id : folderId
        }

        const newNote = new NoteModel(note);
        await newNote.save()

        req.flash("res" , {type : 'success' ,  msg: `A note was created successfully` })
        return res.redirect(`/note/all-notes/${folderId}`)
      }
      
      req.flas('res' , { type : 'error' , msg:'An error occurred, please try again!'})
      return res.redirect('back')

    }catch(error){
      
      if(error.name == "ValidationError"){
        req.flash("res" , {type : 'error' ,  msg: 'You must enter all the data' })
        res.render('pages/createNote' , {errors : error.errors , folderId : req.params.folderId})
      }
      else{
        req.flash("res" , {type : 'error' ,  msg: 'An error occurred, please try again!' })
        res.redirect('back')
        
      }

      return next(error)
    }
  }

  public getNoteDetail = async function(req:any , res:Response ,  next : NextFunction){
    try{
      let noteId = req.params.id
      const note = await NoteModel.findOne({_id : noteId});
      if(note){
        return res.render('pages/noteDetail' , {note})
      }
      
      req.flash('res' , { type : 'error' , msg:'Note not found , please try again'})
      return res.redirect('back')
    }catch(error){
      req.flash('res' , { type : 'error' , msg:'An error occurred, please try again'})
      res.redirect('back')
      return next(error) ;
    }
  }

  public getUpdateNote = async function(req:any , res:Response , next : NextFunction){
    try{
      const noteId = req.params.id;
      const note = await NoteModel.findOne({ _id : noteId})
      
      if(note){
        return res.render('pages/updateNote' , {note})
      }
      
      req.flash('res' , { type : 'error' , msg:'Note not found , please try again!'})
      return res.redirect('back')
    
    }catch(error){
      req.flash('res' , { type : 'error' , msg:'An error occurred, please try again!'})
      res.redirect('back')
      return next(error)
    }

  }


  public getDeleteNote = async function(req:any , res:Response , next : NextFunction){
    try{
      
    }catch(error){
    
    }

  }



}



const noteController = new NoteController();
export default noteController;