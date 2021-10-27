
import { NextFunction, Request , Response} from 'express';
import { getFolder } from '../services/Folder/UseCase/getFolder';
import { managmentError } from '../loaders/error';
import { postFolder } from '../services/Folder/UseCase/postFolder';
import { updateFolder } from '../services/Folder/UseCase/updateFolder';
import { deleteFolder } from '../services/Folder/UseCase/deleteFolder';



class FolderController{
  
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
  
}

const folderController = new FolderController();
export default folderController;