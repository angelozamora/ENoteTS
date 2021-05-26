import {Router} from 'express'
import HomeController from '../controllers/homeController'
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';

const router = Router();


router.get('/', [getUser , isLoged] ,  HomeController.getAllFolders)





export default router;