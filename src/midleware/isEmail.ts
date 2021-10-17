
export function isEmail( req : any, res:any ,next:any){
  try{
    const {email} = req.body;
    const regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');
  
    if(!regex.test(email)){
      throw "Email is invalid"
    }
    next()
  }catch(err){
    console.log(err)
    req.session['message'] = {res : { type : 'error' , msg:err}} 
    res.redirect('back')
  }
  
}