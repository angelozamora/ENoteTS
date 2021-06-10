import FolderModel from '../models/Folder';
import  NoteModel  from '../models/Note';
import { NextFunction, Request , Response} from 'express';
import mongoose from 'mongoose';

class NoteController{
  
  public postFolder = async function(req : any, res:Response , next:NextFunction){

    try{

      var ObjectId = mongoose.Types.ObjectId; 
      let folderId = req.params.folderId;
      if(folderId == '0'){
        folderId = new ObjectId('000000000000000000000000')
      }
      const folder = {
        name : req.body.name,
        user_id : res.locals.user._id,
        folder_id : folderId

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
  
  public getFolder = async function(req : any, res:Response , next:NextFunction){
    try{

      const folderId = req.params.folderId;
      const folder = await FolderModel.findOne({ _id : folderId})
      if(folder){
        const notes = await NoteModel.find({folder_id : folderId}).sort({createdAt : -1})
        return res.render('pages/folder' , {notes , folder})
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
      let folderId = req.params.folderId;
      var ObjectId = mongoose.Types.ObjectId; 
      if(folderId == '0'){
        console.log('SE CREAR UNA NOTA EN MYDRIVE')
        folderId = new ObjectId('000000000000000000000000')
      }else{
        const folder = await FolderModel.findOne({_id : folderId})
        if(!folder){
          // req.flas('res' , { type : 'error' , msg:'An error occurred, please try again!'})
          req.flash('res' , { type : 'error' , msg:'Folder not found'})
          return res.redirect('back')
        }
      }


      return res.render('pages/createNote' , {folderId})

      // const folder = await FolderModel.findOne({ _id : folderId})
      // if(folder){
      //   return res.render('pages/createNote' , {folderId})
      // }
      
      // req.flash('res' , { type : 'error' , msg:'Folder not found'})
      // return res.redirect('back')
      

    }catch(error){
      req.flash('res' , { type : 'error' , msg:'An error occurred, please try again!'})
      res.redirect('back');
      return next(error);
    }
    
  }

  public postCreateNote = async function(req : any, res:Response , next:NextFunction){
    try{
      console.log('LLEGO A LA FUNCION CREAR NOTA')

      const userId = res.locals.user._id;
      let folderId = req.params.folderId;

      var ObjectId = mongoose.Types.ObjectId; 
      if(folderId == '0'){
        folderId = new ObjectId('000000000000000000000000')
      }else{
        const folder = await FolderModel.findOne({_id : folderId})
        if(!folder){
          req.flas('res' , { type : 'error' , msg:'An error occurred, please try again!'})
          return res.redirect('back')
        }
      }

      console.log(folderId)
      
      const note = {
        title : req.body.title,
        body : req.body.body,
        user_id : userId,
        folder_id : folderId
      }
      
      await NoteModel.create(note);
      req.flash("res" , {type : 'success' ,  msg: `A note was created successfully` })

      if(req.params.folderId == '0'){
        return res.redirect(`/mydrive`);
      }else{
        return res.redirect(`/folder/${folderId}`);
      }


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


  public postUpdateNote = async function(req:any , res:Response , next : NextFunction){
    try{
      const {title , body}  =req.body;
      const noteId = req.params.id;
      const note = await NoteModel.findOne({ _id : noteId})
      
      if(note){
        note.title = title;
        note.body = body;
        note.save();

        req.flash('res' , { type : 'success' , msg:'Note updated successfully'})
        return res.redirect(`/note/detail/${note._id}`)
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
      const note = await NoteModel.findOne({_id : req.params.id});
      if(note){
        const folderId = note.folder_id;
        await note.delete();
        return res.json({flag : true, msg : 'Note deleted successfully'});
      }
      
      
      return res.json({flag : false, msg : 'Note not found'});

    }catch(error){
      res.json({ flag : false, msg : 'An error occurred, please try again!'});
      return next(error)
    }

  }
  


}



const noteController = new NoteController();
export default noteController;