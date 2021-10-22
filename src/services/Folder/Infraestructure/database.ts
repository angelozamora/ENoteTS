import FolderModel from '../../../models/Folder';
import  NoteModel  from '../../../models/Note';

import mongoose from 'mongoose';

export class DataBase{


  public async getFolder(filter:any):Promise<any>{
    try{
      return await FolderModel.findOne(filter)
    }catch(error){
      throw "Error interno al intentar obtener un Folder"
    }
  }
  public async getFolders(filter:any):Promise<any>{
    try{
    throw "hola"
      let folders= await FolderModel.find(filter).sort({createdAt : -1})
      return folders
    }catch(error){
      throw "Error interno al intentar obtener la lista de Folders"
    }
  }

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