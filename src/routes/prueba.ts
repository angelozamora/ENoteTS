import {Router} from 'express'



const router:Router = Router();


router.get('/', (req , res ) => {
  console.log('PRUEBA')
  res.render('pages/index') 
})

export default router;