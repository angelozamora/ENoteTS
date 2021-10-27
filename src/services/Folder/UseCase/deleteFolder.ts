import { repository } from '../Domain/repository';
import mongoose from 'mongoose';

type mongoId = string | mongoose.Types.ObjectId
export async function deleteFolder(
  folderId : mongoId
):Promise<any>{
  try{
    let filter={
      _id : folderId
    }

    let folder = await repository.getFolder(filter)
    if(!folder){
      return false
    }
    await repository.deleteFolder(folder)
    return true
  }catch(error){
    throw error
  }
}