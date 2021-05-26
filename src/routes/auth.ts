import {Router} from 'express'
import AuthController from '../controllers/authController'
import { isEmail } from '../midleware/isEmail';
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';

const router = Router();

router.get('/auth/login' , AuthController.getLogin)
router.post('/auth/login' ,[ isEmail], AuthController.postLogin);

router.get('/auth/register', AuthController.getRegister)
router.post('/auth/register' , AuthController.postRegister)

// router.get('/auth/recover/passwordt' )

router.get('/auth/logout' ,[getUser , isLoged], AuthController.postLogout)





export default router;