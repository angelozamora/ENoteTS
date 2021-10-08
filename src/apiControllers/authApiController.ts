import UserModel from '../models/user'
import jwt from 'jsonwebtoken'
class AuthApiController{


  public postLogin = async (req : any , res:any , next:any)=>{
    try{
      const {email, password , remember} = req.body;

      const user =await UserModel.findOne({email : email}) ;
      if(user){
        const isMatch = await user.comparePassword(password);
        if(isMatch){
          const token = jwt.sign({ id: user._id }, `${process.env.PRIVATE_KEY}` , {
            expiresIn : 60 * 60 * 24
          });
          
          return res.json({result : 1 ,auth :true , msg : "Usuario encontrado" , token })

        }  
        return res.json({result : 0 , msg : "Password incorrecto"})
      }
      return res.json({result : 0 , msg : "Email incorrecto"})
    }catch(error){
      console.log(error)
    }
  }


  public postRegister = async function( req : any , res : any , next:any){
    try{
      const user= await UserModel.create({
        email : req.body.email,
        password : req.body.password,
        fullname : req.body.fullname
      })
      
      const token = jwt.sign({ id: user._id }, `${process.env.PRIVATE_KEY}` , {
        expiresIn : 60 * 60 * 24
      });

      return res.json({result : 1 ,auth :true , msg : "You registered a user successfully" , token });
  
    }catch(error:any){
      console.log(error)

      if(error.name == "ValidationError"){
        if(error.errors['email']){
          return res.json({result : 0 ,auth :false , msg : "Email : " + error.errors['email'].message })
        }
        
        return res.json({result : 0 ,auth :false , msg : "Validation Error" })
      }
    }
  
  }
  



}

const authApiController = new AuthApiController();
export default authApiController;