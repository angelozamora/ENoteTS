
type ErrorData = {
  message : string,
  status : number,
  redirect?:string
}
export const managmentError = (error:any , req:any ,res:any ):void=>{
  let dataError : ErrorData = JSON.parse(error)

  console.log(`
      ==================💀====================
		`)
  console.log(`
      ########################################
      ║  💩💩💩     Hubo un throw    💩💩💩  ║
      ########################################
		`)

  console.log(`     Ruta del throw: ${req.path}`)
  console.log(`     Metodo de la ruta: ${req.method}`)
  console.log(`     Typo de throw: ${dataError.status}`)
  console.log(`     Mensaje: ${dataError.message}`)
  console.log(`     Redirección: ${dataError.redirect || 'back'}`)

  req.session['message'] = {
    res : { 
      type : 'error' ,
      msg:dataError.message
    }
  }
  res.redirect(dataError.redirect || 'back')
}