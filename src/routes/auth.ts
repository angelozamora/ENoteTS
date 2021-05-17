import {Router} from 'express'
import AuthController from '../controllers/authController'
import { isEmail } from '../midleware/isEmail';
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';

const router = Router();

router.get('/login' , AuthController.getLogin)
router.post('/login' ,[ isEmail], AuthController.postLogin);

router.get('/register', AuthController.getRegister)
router.post('/register' , AuthController.postRegister)

router.get('/logout' ,[getUser , isLoged], AuthController.postLogout)



export default router;