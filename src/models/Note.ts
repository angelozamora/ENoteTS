import  { Schema, model, Document} from 'mongoose'
import {IFolder} from './Folder'

export interface INote extends Document{
  title : string,
  body : string,
  image : string,
  folder_id : IFolder['_id']
}

const noteSchema = new Schema<INote>({
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
  folder_id : {
    type : Schema.Types.ObjectId,
    ref  : 'Folder'
  }
},{ timestamps: true})

export default model<INote>('Note' , noteSchema)