import  { Schema, model, Document} from 'mongoose'
import {IFolder} from './Folder'
import {IUser} from './user'

export interface INote extends Document{
  title : string,
  body : string,
  user_id : IUser['_id'],
  folder_id : IFolder['_id'],
  updatedAt : Date,
  truncateTitle : () => Promise<string>,
  getDate : ()=>Promise<string>
}

const noteSchema = new Schema<INote>({
  title : {
    type : String , 
    required : [true , 'is required']
  },
  body : {
    type : String,
    required : [true , 'is required']
  },
  user_id : {
    type : Schema.Types.ObjectId,
    ref  : 'User'
  },
  folder_id : {
    type : Schema.Types.ObjectId,
    ref  : 'Folder'
  }
},{ timestamps: true})

noteSchema.methods.truncateTitle = function(){
  if (this.title && this.title.length > 75) {
    return this.title.substring(0, 70) + "...";
  }
  return this.title;
}

noteSchema.methods.getDate = function(){
  let fecha = this.updatedAt.toISOString()
  fecha = fecha.substring(0,10)
  let fechaArray = fecha.substring(0,10).split('-')
  return fecha
}

export default model<INote>('Note' , noteSchema)