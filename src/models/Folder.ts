import {Schema , model, Document} from 'mongoose';
import {IUser} from './user'

export interface IFolder extends Document{
  name : string,
  user_id : IUser['_id'],
  folder_id : IFolder['_id'],
  truncateName :  () => Promise<string>
  
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
  folder_id : {
    type : Schema.Types.ObjectId,
    ref  : 'Folder'
  }
  // folder_id : {
  //   type : String
  // }

},{ timestamps: true})


folderSchema.methods.truncateName = function() {
  if (this.name && this.name.length > 75) {
      return this.name.substring(0, 70) + "...";
  }

  return this.name;
}


export default model<IFolder>('Folder' ,folderSchema)
