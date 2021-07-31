import {Schema , model, Document} from 'mongoose';


export interface IUser extends Document{
  email : string;
  password : string;
  fullname : string;
  comparePassword : ( password : string) => Promise<Boolean>;
};

const UserSchema  = new Schema<IUser>({
  email  : {
    type : String,
    required : [true, "is required"] ,
    unique: true,
    lowercase: true,
    trim: true,
    match : [ /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/ ,  "email is invalid"],
    validate : {
      validator( v : any ){
        return model('User').findOne({email : v})
          .then( user => !user)
      },
      message : "is already taken"
    }
  },
  password : {
    type : String,
    required : [ true , "is required"]
  },
  fullname : {
    type : String,
    required : [true , 'is required']
  }

},{ timestamps: true})


UserSchema.methods.comparePassword = async function(password : string ) : Promise<Boolean>{  
  const hash = Buffer.from(encodeURIComponent(password)).toString('base64');
  if(hash==this.password){
    return true;
  }else{
    return false
  }

}


UserSchema.pre<IUser>('save' , async function(next:any ){
  try{
    const user = this as IUser;
    if(!user.isModified('password')) return next();

    // const res = await bcrypt.hash ( this.password ,  10) ;
    const hash = Buffer.from(encodeURIComponent(user.password)).toString('base64');
    user.password = hash;
    return next()
  }catch(err){
    return next(err)
  }

})


export default model<IUser>('User' , UserSchema )