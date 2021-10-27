import FolderModel from '../../../models/Folder';
import  NoteModel  from '../../../models/Note';

import mongoose from 'mongoose';

type mongoId = string | mongoose.Types.ObjectId

export class DataBase{


  public async getFolder(filter:any):Promise<any>{
    try{
      return await FolderModel.findOne(filter)
    }catch(error){
      throw "Error interno al intentar obtener un Folder"
    }
  }

  public async postFolder(folder:any):Promise<any>{
    try{
      const newFolder = new FolderModel(folder);
      await newFolder.save();
    }catch(error : any){
      if(error.name === "ValidationError"){
        throw `You must enter all the data`
      }else{
        throw "Error interno al intentar guardar un Folder"
      }
    }
  }
  public async getFolders(filter:any):Promise<any>{
    try{
      let folders= await FolderModel.find(filter).sort({createdAt : -1})
      return folders
    }catch(error){
      throw "Error interno al intentar obtener la lista de Folders"
    }
  }
  
  public async updateFolder(
    name : string,
    folderId:mongoId  
  ):Promise<any>{
    try{
      await FolderModel.findByIdAndUpdate(folderId , { name : name})
    }catch(error : any){
      if(error.name === "ValidationError"){
        throw `You must enter all the data`
      }else{
        throw "Error interno al intentar guardar un Folder"
      }
    }
  }

  public async deleteFolder(folder : any):Promise<any>{
    try{
      await folder.delete()
    }catch(error){
      throw "Error interno al intentar eliminar un Folder"
    }
  }

  /****************************** NOTES ***************************/
  public async getNotes(filter:any):Promise<any>{
    try{
      return await NoteModel.find(filter).sort({createdAt : -1})
    }catch(error){
      throw "Error interno al intentar obtener la lista de Notas"
    }
  }

  public async getLastNotes(filter:any):Promise<any>{
    try{
      return await NoteModel.find(filter).sort({updatedAt : -1});
    }catch(error){
      throw "Error interno al intentar obtener la Notas recientes"
    }
  }

 
}