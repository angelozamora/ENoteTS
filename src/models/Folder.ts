import {Schema , model, Document} from 'mongoose';
import {IUser} from './user'

export interface IFolder extends Document{
  name : string,
  user_id : IUser['_id']
}

const folderSchema = new Schema<IFolder>({
  name :{
    type : String,
    required : [true , 'is required']
  },
  user_id : {
    type : Schema.Types.ObjectId,
    ref  : 'User'
  },

},{ timestamps: true})

export default model<IFolder>('Folder' ,folderSchema)
