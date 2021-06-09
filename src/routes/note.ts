import {Router} from 'express'
import NoteController from '../controllers/noteController';
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';



export default (router : Router)=>{
  router.post('/note/create/folder/:folderId',[getUser , isLoged], NoteController.postFolder)


  router.get('/note/all-notes/:folderId',[getUser , isLoged], NoteController.getAllNotes)
  router.get('/note/create/:folderId',[getUser , isLoged],NoteController.getCreateNote )
  router.post('/note/create/:folderId',[getUser , isLoged],NoteController.postCreateNote )
  router.get('/note/detail/:id', [getUser , isLoged],NoteController.getNoteDetail)
  router.get('/note/update/:id', [getUser , isLoged],NoteController.getUpdateNote)
  router.post('/note/update/:id', [getUser , isLoged],NoteController.postUpdateNote)
  router.delete('/note/delete/:id', [getUser , isLoged],NoteController.getDeleteNote)
  
  
}