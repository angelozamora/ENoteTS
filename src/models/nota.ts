import  { Schema, model, Document} from 'mongoose'
import {IUser} from './user'

export interface INota extends Document{
  title : string,
  body : string,
  image : string,
  timestamp : Date,
  user_id : IUser['_id']
}

const notaSchema = new Schema<INota>({
  title : {
    type : String , 
    required : [true , 'is requred']
  },
  body : {
    type : String,
    required : [true , 'is required']
  },
  image : {
    type : String
  },
  timestamp : { 
    type : Date,
    default : new Date
  },
  user_id : {
    type : Schema.Types.ObjectId,
    ref  : 'User'
  }
})

export default model<INota>('Nota' , notaSchema)