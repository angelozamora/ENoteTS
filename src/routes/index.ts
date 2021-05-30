import {Router} from 'express'
import home from './home';
import auth from './auth';
import note from './note'


export default ()=>{

  const router = Router();
  home(router);
  auth(router);
  note(router);
  
  return router
}