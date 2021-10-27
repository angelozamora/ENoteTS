import  NoteModel  from '../models/Note';

import { NextFunction, Request , Response} from 'express';
import { managmentError } from '../loaders/error';
import { getCreateNote } from '../services/Note/UseCase/getCreateNote';
import { postCreateNote } from '../services/Note/UseCase/postCreateNote';
import { getNoteDetail } from '../services/Note/UseCase/getNoteDetail';
import { getUpdateNote } from '../services/Note/UseCase/getUpdateNote';
import { updateNote } from '../services/Note/UseCase/updateNote';
import { updateNoteName } from '../services/Note/UseCase/updateNoteName';
import { deleteNote } from '../services/Note/UseCase/deleteNote';

class NoteController{
  public getCreateNote = async function(req : any, res:Response , next:NextFunction){
    try{
      let folderId = req.params.folderId;
      if(folderId != '0'){
        await getCreateNote(folderId)
      }
      return res.render('pages/createNote' , {folderId})
    }catch(error){
      managmentError(error, req, res)
    }
    
  }

  public postCreateNote = async function(req : any, res:Response , next:NextFunction){
    try{
      const userId = res.locals.user._id;
      let folderId = req.params.folderId;
      let {title , body} = req.body
      await postCreateNote(title , body , userId , folderId)
      
      req.session['message'] = {res : { type : 'success' , msg:`A note was created successfully`}}
      if(req.params.folderId == '0'){
        return res.redirect(`/mydrive`);
      }
      return res.redirect(`/folder/${folderId}`);
    }catch(error:any){
      // if(error.name == "ValidationError"){
      //   res.render('pages/createNote' , {errors : error.errors , folderId : req.params.folderId})
      // }
      // else{
      //   req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again!`}}
      //   res.redirect('back')
      // }

      managmentError(error, req, res)
    }
  }
  
  public getNoteDetail = async function(req:any , res:Response ,  next : NextFunction){
    try{
      let noteId:string = req.params.id
      const result = await getNoteDetail(noteId)
      return res.render('pages/noteDetail' , result )   
    }catch(error){
      managmentError(error, req, res)
    }
  }

  public getUpdateNote = async function(req:any , res:Response , next : NextFunction){
    try{
      const noteId = req.params.id;
      const note = await getUpdateNote(noteId)
      return res.render('pages/updateNote' , {note})
    }catch(error){
      managmentError(error, req, res)
    }
  }

  public postUpdateNote = async function(req:any , res:Response , next : NextFunction){
    try{
      const {title , body}  =req.body;
      const noteId = req.params.id;
      await updateNote(title , body, noteId)
      req.session['message'] = {res : { type : 'success' , msg:`Note updated successfully`}}
      return res.redirect(`/note/detail/${noteId}`)
      
    }catch(error){
      managmentError(error, req, res)
    }

  }
  
  public postUpdateNoteName = async function(req : any, res:Response , next:NextFunction){

    try{
      let noteId = req.params.id;
      let {newName}= req.body
      await updateNoteName(newName , noteId)
      req.session['message'] = {res : { type : 'success' , msg:`Note updated successfully`}}
      return res.redirect('back')
    }catch(error:any){
      managmentError(error, req, res)
    }
  }

  public deleteNote = async function(req:any , res:Response , next : NextFunction){
    try{
      const nodeId:string = req.params.id;
      let result = await deleteNote(nodeId)
      if(!result){
        return res.json({flag : false, msg : 'Note not found'});
      } 
      return res.json({flag : true, msg : 'Note deleted successfully'});
      
    }catch(error){
      res.status(500).send({flag : false, msg : 'An error occurred, please try again'})
      return next(error)
    }
  }
}

const noteController = new NoteController()
export default noteController