export async function isLoged( req : any ,  res:any , next :any){
  if(!res.locals.user){
    return res.redirect('/auth/login')
  }

  next();
}
