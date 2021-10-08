import {Router} from 'express'
import AuthController from '../controllers/authController'
import AuthApiController from '../apiControllers/authApiController'
import { isEmail } from '../midleware/isEmail';
import { getUser } from '../midleware/getUser';
import { isLogged } from '../midleware/isLogged';
import { noLogged } from '../midleware/noLogged';


export default (router : Router)=>{
  router.get('/auth/login' , [noLogged] ,  AuthController.getLogin)
  router.post('/auth/login' ,[ isEmail], AuthController.postLogin);

  router.get('/auth/register', AuthController.getRegister)
  router.post('/auth/register' , AuthController.postRegister)

  // router.get('/auth/recover/passwordt' )
  router.get('/auth/logout' ,[getUser , isLogged], AuthController.postLogout)

  
  /********** RUTAS API **********/
  router.post('/api/auth/login' , AuthApiController.postLogin)
  router.post('/api/auth/register' , AuthApiController.postRegister)
  
};