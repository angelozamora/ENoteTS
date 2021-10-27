import { repository } from "../Domain/repository"

export async function getUpdateNote(
  noteId : string
):Promise<any>{
  try{
    const filter = {
      _id : noteId
    }
    const note = await repository.getNote(filter)
    if(!note){
      throw `Note not found , please try again`
    }
    
    return note
  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: '/mydrive',
    })
  }
}