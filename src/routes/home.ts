import {Router} from 'express'
import HomeController from '../controllers/homeController'
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';


export default (router : Router)=>{
  router.get('/', [getUser , isLoged] ,  HomeController.getMyUnit);
  router.get('/mydrive', [getUser , isLoged] ,  HomeController.getAllFolders)
}