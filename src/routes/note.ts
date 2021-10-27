import {Router} from 'express'
import NoteController from '../controllers/noteController';
import { getUser } from '../midleware/getUser';
import { isLogged } from '../midleware/isLogged';

export default (router : Router)=>{
  router.get('/note/create/:folderId',[getUser , isLogged],NoteController.getCreateNote )
  router.post('/note/create/:folderId',[getUser , isLogged],NoteController.postCreateNote )
  router.post('/note/change-name/:id',[getUser , isLogged], NoteController.postUpdateNoteName)
  router.get('/note/detail/:id', [getUser , isLogged],NoteController.getNoteDetail)
  router.get('/note/update/:id', [getUser , isLogged],NoteController.getUpdateNote)
  router.post('/note/update/:id', [getUser , isLogged],NoteController.postUpdateNote)
  router.delete('/note/delete/:id', [getUser , isLogged],NoteController.deleteNote)
}