import { repository } from "../Domain/repository"
import mongoose from 'mongoose';

type mongoId = string | mongoose.Types.ObjectId
export async function updateFolder(
  name : string,
  folderId : mongoId
):Promise<any>{
  try{
    await repository.updateFolder(name , folderId)
  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: 'back',
    })
  } 
}