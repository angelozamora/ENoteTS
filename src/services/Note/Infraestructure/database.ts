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

  public async getNote(filter:any):Promise<any>{
    try{
      return await NoteModel.findOne(filter)
    }catch(error){
      throw "Error interno al intentar obtener una Nota"
    }
  }



  public async postNote(note:any):Promise<any>{
    try{
      await NoteModel.create(note);
    }catch(error : any){
      if(error.name === "ValidationError"){
        throw `You must enter all the data`
      }else{
        throw "Error interno al intentar guardar una Nota"
      }
    }
  }
  
  public async updateNote(
    update : any,
    noteId : mongoId
  ):Promise<any>{
    try{
      await NoteModel.findByIdAndUpdate(noteId , update);
    }catch(error : any){
      if(error.name === "ValidationError"){
        throw `You must enter all the data`
      }else{
        throw "Error interno al intentar editar una Nota"
      }
    }
  }

  

  public async deleteNote(note : any):Promise<any>{
    try{
      await note.delete()
    }catch(error){
      throw "Error interno al intentar eliminar un Folder"
    }
  }

}