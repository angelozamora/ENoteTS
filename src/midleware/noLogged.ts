import { NextFunction, Request , Response} from 'express';

export function noLogged( req:any , res:Response , next:NextFunction){
  if(req.session.userId){
    return res.redirect('/');
  }

  return next()
}  