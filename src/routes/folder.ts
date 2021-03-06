import {Router} from 'express'
import NoteController from '../controllers/folderController';
import { getUser } from '../midleware/getUser';
import { isLogged } from '../midleware/isLogged';



export default (router : Router)=>{
  router.post('/folder/create/:folderId',[getUser , isLogged], NoteController.postFolder)
  router.post('/folder/change-name/:folderId',[getUser , isLogged], NoteController.postUpdateFolderName)
  router.get('/folder/:folderId',[getUser , isLogged], NoteController.getFolder)
  router.delete('/folder/delete/:folderId',[getUser , isLogged], NoteController.deleteFolder)


  router.get('/note/create/:folderId',[getUser , isLogged],NoteController.getCreateNote )
  router.post('/note/create/:folderId',[getUser , isLogged],NoteController.postCreateNote )
  router.post('/note/change-name/:id',[getUser , isLogged], NoteController.postUpdateNoteName)
  router.get('/note/detail/:id', [getUser , isLogged],NoteController.getNoteDetail)
  router.get('/note/update/:id', [getUser , isLogged],NoteController.getUpdateNote)
  router.post('/note/update/:id', [getUser , isLogged],NoteController.postUpdateNote)
  router.delete('/note/delete/:id', [getUser , isLogged],NoteController.getDeleteNote)

}