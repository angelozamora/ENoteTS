import { repository } from "../Domain/repository";

export async function getFolder(
  id:string
):Promise<any>{
  try{
    let filter={
      _id : id
    }
      const folder = await repository.getFolder(filter)
      if(!folder){
        return null
      }
      const folders = await repository.getFolders(filter)
      const notes = await repository.getNotes(filter)
      return {folders , notes , folder}

  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: '/mydrive',
    })
  }

}