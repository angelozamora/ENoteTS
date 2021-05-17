export async function isLoged( req : any ,  res:any , next :any){
  if(!res.locals.user){
    console.log('No logeado')
    return res.redirect('/login')
  }

  console.log('Logeado')
  next();
}
