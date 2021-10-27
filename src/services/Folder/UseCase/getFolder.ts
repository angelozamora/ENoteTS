import { repository } from "../Domain/repository";
import mongoose from 'mongoose';

type mongoId = string | mongoose.Types.ObjectId
export async function getFolder(
  folderId:mongoId
):Promise<any>{
  try{
    let filter={
      _id : folderId
    }

    const folder = await repository.getFolder(filter)
    if(!folder){
      return null
    }
    const folders = await repository.getFolders({folder_id : folderId})
    const notes = await repository.getNotes({folder_id : folderId})
    return {folders , notes , folder}

  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: '/mydrive',
    })
  }

}