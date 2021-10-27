import { repository } from "../Domain/repository"


export async function getCreateNote(
  folderId : string
):Promise<any>{
  try{
    const filter = {
      _id : folderId
    }
    const folder= await repository.getFolder(filter)
    if(!folder){
      throw `Folder not found`
    }

    return folder
  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: '/mydrive',
    })
  }
}