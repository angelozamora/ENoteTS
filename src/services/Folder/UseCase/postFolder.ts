
import { repository } from "../Domain/repository";
import mongoose from 'mongoose';

interface Folder {
  name : string,
  user_id : string,
  folder_id : string
}
export async function postFolder(
  name : string,
  userId : any,
  folderId : any
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