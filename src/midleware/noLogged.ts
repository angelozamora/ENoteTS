export function noLogged( req:any , res:any , next:any){
  if(req.session.userId){
    return res.redirect('/');
  }

  return next()
}  