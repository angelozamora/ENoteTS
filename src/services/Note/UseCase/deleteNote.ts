import { repository } from '../Domain/repository';
import mongoose from 'mongoose';

type mongoId = string | mongoose.Types.ObjectId
export async function deleteNote(
  noteId : mongoId
){
  try{
    let filter={
      _id : noteId
    }

    const note = await repository.getNote(filter)
    if(!note){
      return false
    }
    await repository.deleteNote(note)
    return true
  }catch(error){
    throw error
  }
}