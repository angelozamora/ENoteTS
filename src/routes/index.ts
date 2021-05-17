import {Router} from 'express'
import { getUser } from '../midleware/getUser';
import { isLoged } from '../midleware/isLoged';

const router = Router();


router.get('/', [getUser , isLoged] ,  (req : any , res : any ) => {
   res.render('pages/index') 
})





export default router;