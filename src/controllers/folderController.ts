import FolderModel from '../models/Folder';
import  NoteModel  from '../models/Note';
import { NextFunction, Request , Response} from 'express';
import mongoose from 'mongoose';

class NoteController{
  
  public postFolder = async function(req : any, res:Response , next:NextFunction){
  
    try{
      var ObjectId = mongoose.Types.ObjectId; 
      let folderId = req.params.folderId;
      let folderIdAux = folderId
      if(folderId == '0'){
        folderIdAux = new ObjectId('000000000000000000000000')
      }
      const folder = {
        name : req.body.name,
        user_id : res.locals.user._id,
        folder_id : folderIdAux
      }
      
      const newFolder = new FolderModel(folder);
      await newFolder.save();

      req.session['message'] = {res : { type : 'success' , msg:`Folder created successfully`}}
      if(folderId == '0'){
        return res.redirect('/mydrive')
      }else{
        return res.redirect(`/folder/${folderId}`)
      }
      

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
  public postUpdateFolderName = async function(req : any, res:Response , next:NextFunction){

    try{
      let folderId = req.params.folderId;
      await FolderModel.findByIdAndUpdate(folderId , { name : req.body.newName})
      req.session['message'] = {res : { type : 'success' , msg:`Folder update successfully`}}
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
  public getFolder = async function(req : any, res:Response , next:NextFunction){
    try{

      const folderId = req.params.folderId;

      if(folderId == '0'){
        return res.redirect('/mydrive')
      }else{
        const folder = await FolderModel.findOne({ _id : folderId})
        if(!folder){
          req.session['message'] = {res : { type : 'error' , msg:`Folder not found`}}
          return res.redirect('/mydrive')
        }

        const folders = await FolderModel.find({folder_id : folderId}).sort({createdAt : -1})
        const notes = await NoteModel.find({folder_id : folderId}).sort({createdAt : -1})
        return res.render('pages/folder' , {folders , notes , folder})
      }      
    }catch(error){
      req.session['message'] = {res : { type : 'error' , msg:`An error occurred, please try again`}}
      res.redirect('/mydrive') //redirecciona a la pagina
      return next(error) // envia el error al midleware, aqui se puede hacer algo o reenviar a otro lado, revisar
    }
  }

  public deleteFolder = async function(req : any, res:Response , next:NextFunction){
    try{

      const folderId = req.params.folderId;
      if(folderId == '0'){
        return res.redirect('/mydrive')
      }

      const folder = await FolderModel.findOne({_id : folderId});
      if(!folder){
        return res.json({flag : false, msg : 'Folder not found'});
      }
      
      await folder.delete()
      return res.json({flag : true, msg : 'Folder deleted successfully'});
            
    }catch(error){
      res.status(500).send({flag : false, msg : 'An error occurred, please try again'})
      return next(error)
    }

  }


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