
import { repository } from "../Domain/repository";
import mongoose from 'mongoose';

type mongoId = string | mongoose.Types.ObjectId

interface Folder {
  name : string,
  user_id : mongoId,
  folder_id : mongoId
}
export async function postFolder(
  name : string,
  userId : mongoId,
  folderId : mongoId
):Promise<any>{
  try{
    let ObjectId = mongoose.Types.ObjectId;
    let folderIdAux = folderId
    if(folderId == '0'){
      folderIdAux = new ObjectId('000000000000000000000000')
    }

    const folder:Folder = {
      name : name,
      user_id : userId,
      folder_id : folderIdAux
    }
    
    await repository.postFolder(folder)
  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: 'back',
    })
  }
}