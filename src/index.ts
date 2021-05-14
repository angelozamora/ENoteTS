import {startServer} from './config'
import {startConnection} from './database'


async function startProyect(){
  try{
    await startConnection();
    await startServer();
  }catch(err){
    console.log(err)
  }

}

startProyect();
