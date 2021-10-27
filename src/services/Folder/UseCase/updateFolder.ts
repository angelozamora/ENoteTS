import { repository } from "../Domain/repository"

export async function updateFolder(
  name : string,
  folderId : string
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