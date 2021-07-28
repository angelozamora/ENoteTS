import {Router} from 'express'
import NoteController from '../controllers/folderController';
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';



export default (router : Router)=>{
  router.post('/folder/create/:folderId',[getUser , isLoged], NoteController.postFolder)
  router.get('/folder/:folderId',[getUser , isLoged], NoteController.getFolder)
  router.delete('/folder/delete/:folderId',[getUser , isLoged], NoteController.deleteFolder)


  router.get('/note/create/:folderId',[getUser , isLoged],NoteController.getCreateNote )
  router.post('/note/create/:folderId',[getUser , isLoged],NoteController.postCreateNote )
  router.get('/note/detail/:id', [getUser , isLoged],NoteController.getNoteDetail)
  router.get('/note/update/:id', [getUser , isLoged],NoteController.getUpdateNote)
  router.post('/note/update/:id', [getUser , isLoged],NoteController.postUpdateNote)
  router.delete('/note/delete/:id', [getUser , isLoged],NoteController.getDeleteNote)

}