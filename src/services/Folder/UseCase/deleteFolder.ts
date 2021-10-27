import { repository } from '../Domain/repository';
export async function deleteFolder(
  folderId : string
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