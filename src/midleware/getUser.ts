
import UserModel from '../models/user'
export   async function getUser (req : any , res:any , next : any){
  const userId=req.session.userId;
  if(userId){
    const user = await UserModel.findById(userId);
    if(user){
      res.locals.user = user
    }else{
      delete req.session.userId
    }
  }
  
  next()
}
