import {Router} from 'express'
import HomeController from '../controllers/homeController'
import { getUser } from '../midleware/getUser';
import { isLogged } from '../midleware/isLogged';


export default (router : Router)=>{
  router.get('/', [getUser , isLogged] ,  HomeController.redirectMyDrive);
  router.get('/mydrive', [getUser , isLogged] ,  HomeController.getMyDrive)
}