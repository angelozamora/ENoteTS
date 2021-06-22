import {Router} from 'express'
import home from './home';
import auth from './auth';
import folder from './folder'


export default ()=>{

  const router = Router();
  home(router);
  auth(router);
  folder(router);
  
  return router
}