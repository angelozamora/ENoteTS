import express from "express";
import path from "path";
import { resolve } from "path";
import router from "./routes"
import * as dotenv from "dotenv";
import cookieSession from 'cookie-session';
import flash from 'express-flash';

dotenv.config({ path:resolve(__dirname, "../.env") });



export async function startServer(){
  const app = express();

  /****SETTINGS***/
  
  app.set('PORT', process.env.PORT || 4000 );
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug')
  
  /*********MIDLEWARE*******/
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(flash());
  
  app.use('/public', express.static(path.join(__dirname, '../public')))
  app.use(cookieSession({
    secret: 'SECRET KEY',
    maxAge: 24 * 60 * 60 * 1000
  }))

  app.use( ( req : any , res:any , next : any )=>{
    
    res.locals.message = req.session['message']
    delete req.session['message']
    console.log('*********************** MENSAJE GUARDADO ***********************')
    console.log(res.locals.message)
    // console.log(req.headers.referer)
    console.log(req.url)

    res.locals.form = req.session['form']
    delete req.session['form']

    next()
  })

  /**********ROUTER***********/
  app.use('/' , router())


  app.use( (err:any , req:any ,res:any , next:any)=>{
    
    if (res.headersSent) {
      console.log('ERROR AFTER SENT HEADERS TO THE CLIENTE')
      return next(err);
    }
    console.log(err)
    console.log('ERROR BEFORE SENT HEADERS TO THE CLIENTE')
    res.status(500).send('SORRY, AN ERROR HAPPENED')


  })


  app.listen(app.get('PORT') , ()=>{
    console.log(
      `
      **************************************
      ║  Server listening on port : ${app.get('PORT')}   ║
      **************************************
      `
    )
  })

  return app;
} 


