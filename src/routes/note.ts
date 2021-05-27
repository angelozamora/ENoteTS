import {Router} from 'express'
import NoteController from '../controllers/noteController';
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';



export default (router : Router)=>{
  router.post('/note/create/folder',[getUser , isLoged], NoteController.postFolder)


  router.get('/note/all-notes/:id', NoteController.getAllNotes)
  router.get('/note/detail/:id', )
  router.get('/note/create/:id', )
  router.post('/note/create', )
  
}