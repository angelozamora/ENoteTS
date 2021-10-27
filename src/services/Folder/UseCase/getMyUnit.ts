import { repository } from "../Domain/repository";
import mongoose from 'mongoose';

type mongoId = string | mongoose.Types.ObjectId
export async function getMyUnit(
  userId:mongoId
):Promise<any>{
  try{
      const filter = {
        user_id : userId , 
        folder_id : '000000000000000000000000'
      }
      const folders =  await repository.getFolders(filter)
      const notes = await repository.getNotes(filter)
      const recentNotes = await repository.getLastNotes(filter)
      
      return {folders, notes, recentNotes}

  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: '/auth/logout',
    })
  }

}