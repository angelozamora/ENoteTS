import FolderModel from '../../../models/Folder';
import  NoteModel  from '../../../models/Note';


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

  /****************************** */
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
    folderId:string  
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