import FolderModel from '../models/Folder';
import  NoteModel  from '../models/Note';
import { NextFunction, Request , Response} from 'express';
import mongoose from 'mongoose';
import { getFolder } from '../services/Folder/UseCase/getFolder';
import { managmentError } from '../loaders/error';
import { postFolder } from '../services/Folder/UseCase/postFolder';
import { updateFolder } from '../services/Folder/UseCase/updateFolder';
import { deleteFolder } from '../services/Folder/UseCase/deleteFolder';



class NoteController{
  
  public postFolder = async function(req : any, res:Response , next:NextFunction){
  
    try{
      let {name} = req.body 
      let folderId = req.params.folderId;
      await postFolder(name ,res.locals.user._id , folderId)
      req.session['message'] = {res : { type : 'success' , msg:`Folder created successfully`}}
      
      if(folderId == '0'){
        return res.redirect('/mydrive')
      }
      return res.redirect(`/folder/${folderId}`)
    }catch(error:any){ 
      managmentError(error, req, res)
    }
    
  }
  public postUpdateFolderName = async function(req : any, res:Response , next:NextFunction){

    try{
      let {newName} = req.body
      let folderId = req.params.folderId;
      await updateFolder(newName, folderId)
      req.session['message'] = {res : { type : 'success' , msg:`Folder update successfully`}}
      return res.redirect('back')
      
    }catch(error:any){
      managmentError(error, req, res)
    }
  }
  public getFolder = async function(req : any, res:Response , next:NextFunction){
    try{

      const folderId:string = req.params.folderId;
      if(folderId == '0'){
        return res.redirect('/mydrive')
      }
      
      const result = await getFolder(folderId)
      if(!result){
        req.session['message'] = {res : { type : 'error' , msg:`Folder not found`}}
        return res.redirect('/mydrive')
      }

      return res.render('pages/folder' , result)
    }catch(error){
      managmentError(error, req, res)
    }
  }

  public deleteFolder = async function(req : any, res:Response , next:NextFunction){
    try{

      const folderId:string = req.params.folderId;
      if(folderId == '0'){
        return res.redirect('/mydrive')
      }
      
      let result = await deleteFolder(folderId)
      if(!result){
        return res.json({flag : false, msg : 'Folder not found'});
      } 
      
      return res.json({flag : true, msg : 'Folder deleted successfully'});    
    }catch(error){
      res.status(500).send({flag : false, msg : 'An error occurred, please try again'})
      return next(error)
    }

  }
  
  /***************************** FALTA CAMBIAR ***********************/

  public getCreateNote = async function(req : any, res:Response , next:NextFunction){
    try{
      let folderId = req.params.folderId;
      if(folderId != '0'){
        const folder = await FolderModel.findOne({_id : folderId})
        if(!folder){
          req.session['message'] = {res : { type : 'error' , msg:`Folder not found`}}
          return res.redirect('back')
        }
      }
      return res.render('pages/createNote' , {folderId})
    }catch(error){
      req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again`}}
      res.redirect('/mydrive');
      return next(error);
    }
    
  }

  public postCreateNote = async function(req : any, res:Response , next:NextFunction){
    try{
      const userId = res.locals.user._id;
      let folderId = req.params.folderId;

      var ObjectId = mongoose.Types.ObjectId; 
      if(folderId == '0'){
        folderId = new ObjectId('000000000000000000000000')
      }else{
        const folder = await FolderModel.findOne({_id : folderId})
        if(!folder){
          req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again!`}}
          return res.redirect('/mydrive')
        }
      }

      const note = {
        title : req.body.title,
        body : req.body.body,
        user_id : userId,
        folder_id : folderId
      }
      
      await NoteModel.create(note);
      req.session['message'] = {res : { type : 'success' , msg:`A note was created successfully`}}
      if(req.params.folderId == '0'){
        return res.redirect(`/mydrive`);
      }else{
        return res.redirect(`/folder/${folderId}`);
      }


    }catch(error:any){
      
      if(error.name == "ValidationError"){
        res.render('pages/createNote' , {errors : error.errors , folderId : req.params.folderId})
      }
      else{
        req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again!`}}
        res.redirect('back')
      }

      return next(error)
    }
  }
  
  public getNoteDetail = async function(req:any , res:Response ,  next : NextFunction){
    try{
      let noteId = req.params.id
      const note = await NoteModel.findOne({_id : noteId});
      if(!note){
        req.session['message'] = {res : { type : 'error' , msg:`Note not found , please try again`}}
        return res.redirect('/mydrive')
      }

      let folderId
      if(note.folder_id == '000000000000000000000000'){
        folderId= '0';
      }else{
        folderId = note.folder_id;
      }
      return res.render('pages/noteDetail' , {note , folderId})   
    }catch(error){
      req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again`}}
      res.redirect('/mydrive')
      return next(error) ;
    }
  }

  public getUpdateNote = async function(req:any , res:Response , next : NextFunction){
    try{
      const noteId = req.params.id;
      const note = await NoteModel.findOne({ _id : noteId})

      if(!note){
        req.session['message'] = {res : { type : 'error' , msg:`Note not found , please try again`}}
        return res.redirect('/mydrive')
      }
      
      return res.render('pages/updateNote' , {note})
      
    }catch(error){
      req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again`}}
      res.redirect('/mydrive')
      return next(error)
    }
  }

  public postUpdateNote = async function(req:any , res:Response , next : NextFunction){
    try{
      const {title , body}  =req.body;
      const noteId = req.params.id;
      const note = await NoteModel.findOne({ _id : noteId})


      if(!note){
        req.session['message'] = {res : { type : 'error' , msg:`Note not found , please try again`}}
        return res.redirect('/mydrive')
      }
      
      note.title = title;
      note.body = body;
      note.save();

      req.session['message'] = {res : { type : 'success' , msg:`Note updated successfully`}}
      return res.redirect(`/note/detail/${note._id}`)
      
    }catch(error){
      req.session['message'] = {res : { type : 'error' , msg:`Note not found , please try again`}}
      res.redirect('/mydrive')
      return next(error)
    }

  }
  
  public postUpdateNoteName = async function(req : any, res:Response , next:NextFunction){

    try{
      let noteId = req.params.id;
      await NoteModel.findByIdAndUpdate(noteId , { title : req.body.newName})
      req.session['message'] = {res : { type : 'success' , msg:`Note updated successfully`}}
      return res.redirect('back')
      
    }catch(error:any){
      if(error.name === "ValidationError"){
        req.session['message'] = {res : { type : 'error' , msg:`You must enter all the data`}}
      }else{
        req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again`}}
      }
      res.redirect('back')
      return next(error)
    }
  }

  public getDeleteNote = async function(req:any , res:Response , next : NextFunction){
    try{
      const note = await NoteModel.findOne({_id : req.params.id});
      if(!note){
        return res.json({flag : false, msg : 'Note not found'});
      }

      await note.delete();
      return res.json({flag : true, msg : 'Note deleted successfully'});
      
    }catch(error){
      res.status(500).send({flag : false, msg : 'An error occurred, please try again'})
      return next(error)
    }
  }
}

const noteController = new NoteController();
export default noteController;