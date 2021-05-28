import {Router} from 'express'
import NoteController from '../controllers/noteController';
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';



export default (router : Router)=>{
  router.post('/note/create/folder',[getUser , isLoged], NoteController.postFolder)


  router.get('/note/all-notes/:folderId', NoteController.getAllNotes)
  router.get('/note/detail/:id', )
  router.get('/note/create/:folderId',NoteController.getCreateNote )
  router.post('/note/create/:folderId',NoteController.postCreateNote )
  
}