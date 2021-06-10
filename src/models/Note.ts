import  { Schema, model, Document} from 'mongoose'
import {IFolder} from './Folder'
import {IUser} from './User'

export interface INote extends Document{
  title : string,
  body : string,
  user_id : IUser['_id'],
  folder_id : IFolder['_id'],
  truncateTitle : () => Promise<string>
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

export default model<INote>('Note' , noteSchema)