import FolderModel from '../models/Folder';
import  NoteModel  from '../models/Note';

import { NextFunction, Request , Response} from 'express';
import jwt from 'jsonwebtoken';
class HomeApiController{

  public getMyDrive = async (req:Request , res:Response , next:NextFunction)=>{

    try{
      const token = req.headers['access-token']
      if(!token){
        return res.status(400).json({result : 0 ,auth :false , msg : "No token provided" })
      }

      let decoded:any = jwt.verify( `${token}`, `${process.env.PRIVATE_KEY}`);      
      const userId = decoded.id;
      const folders = await FolderModel.find({user_id : userId , folder_id : '000000000000000000000000' }).sort({createdAt : -1});
      const notes = await NoteModel.find({user_id : userId , folder_id : '000000000000000000000000' }).sort({createdAt : -1});
      const recentNotes = await NoteModel.find({user_id : userId , folder_id : '000000000000000000000000' }).sort({updatedAt : -1});

      res.json({result : 1 ,auth :true , msg : "Operacion exitosa" , folders, notes, recentNotes})
    }catch(err){
      console.log(err)
    }
  }

}
const homeApiController = new HomeApiController();
export default homeApiController