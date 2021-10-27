import mongoose from 'mongoose';
import { repository } from '../Domain/repository';

type mongoId = string | mongoose.Types.ObjectId

interface INote {
  title : string,
  body : string,
  user_id : mongoId,
  folder_id : mongoId
}
export async function postCreateNote(
  title:string , 
  body: string,
  userId : mongoId,
  folderId : mongoId 
):Promise<any>{
  try{
    let ObjectId = mongoose.Types.ObjectId; 
    if(folderId == '0'){
      folderId = new ObjectId('000000000000000000000000')
    }else{
      const folder = repository.getFolder({_id : folderId})
      if(!folder){
        throw "An error occurred, please try again!"
      }
    }

    const note:INote = {
      title : title,
      body : body,
      user_id : userId,
      folder_id : folderId
    }
    
    await repository.postNote(note)
  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: 'back',
    })
  }
}