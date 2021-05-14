import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import { resolve } from "path"

dotenv.config({ path:resolve(__dirname, "../.env") });



export async function startConnection(){
  await mongoose.connect( process.env.MONGO_URI+"", { useNewUrlParser: true } )
  console.log(
    `
      **************************************
      ║      MongoAtlasDB - connect        ║
      **************************************

      **************************************
      ║      MongoAtlasDB - connect        ║
      **************************************

      **************************************
      ║      asdasdasdasdasdasdasdasd       ║
      **************************************

      **************************************
      ║       asdasdasdasdasdasdasdasd        ║
      **************************************

      **************************************
      ║       asdasdasdasdasdasdasdasd        ║
      **************************************
      `
  )

}