import {Router} from 'express'
import UserController from '../controllers/userController'
import { isEmail } from '../midleware/isEmail';
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';

const router = Router();

router.get('/login' , UserController.getLogin)
router.post('/login' ,[ isEmail], UserController.postLogin);

router.get('/register', UserController.getRegister)
router.post('/register' , UserController.postRegister)

router.get('/logout' ,[getUser , isLoged], UserController.postLogout)



export default router;