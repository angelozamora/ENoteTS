import mongoose from 'mongoose';
import { repository } from "../Domain/repository";

type mongoId = string | mongoose.Types.ObjectId
export async function updateNoteName(
  title:string ,
  noteId:mongoId
):Promise<any>{
  try{
    
    let filter = {_id : noteId}
    let note = await repository.getNote(filter);
    if(!note){
      throw `Note not found , please try again`
    }

    let update = {title:title }
    await repository.updateNote(update ,noteId )
  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: '/mydrive',
    })
  }
}