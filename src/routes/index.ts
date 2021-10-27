import {Router} from 'express'
import home from './home';
import auth from './auth';
import folder from './folder'
import note from './note';


export default ()=>{

  const router = Router();
  home(router);
  auth(router);
  folder(router);
  note(router)
  
  return router
}