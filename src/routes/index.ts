import {Router} from 'express'
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';

const router = Router();


router.get('/', [getUser , isLoged] ,  (req : any , res : any ) => {
   console.log('INDEX')
   res.render('pages/index') 
})


export default router;