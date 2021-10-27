import { repository } from '../Domain/repository';
export async function getNoteDetail(noteId :string):Promise<any>{
  try{
    let filter = {_id : noteId}
    const note = await repository.getNote(filter);
    if(!note){
      throw "Note not found , please try again"
    }

    let folderId
    if(note.folder_id == '000000000000000000000000'){
      folderId= '0';
    }else{
      folderId = note.folder_id;
    }
    
    return {note , folderId}
  }catch(error){
    throw JSON.stringify({
      message: error,
      status: 404,
      redirect: '/mydrive',
    })
  }
}