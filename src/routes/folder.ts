import {Router} from 'express'
import FolderController from '../controllers/folderController';
import { getUser } from '../midleware/getUser';
import { isLogged } from '../midleware/isLogged';



export default (router : Router)=>{
  router.post('/folder/create/:folderId',[getUser , isLogged], FolderController.postFolder)
  router.post('/folder/change-name/:folderId',[getUser , isLogged], FolderController.postUpdateFolderName)
  router.get('/folder/:folderId',[getUser , isLogged], FolderController.getFolder)
  router.delete('/folder/delete/:folderId',[getUser , isLogged], FolderController.deleteFolder)


  
  
}