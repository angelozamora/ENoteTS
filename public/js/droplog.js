document.addEventListener('DOMContentLoaded', () => {
  console.log('listosssss')
  this.dropLog();
})


async function dropLog() {
  /* CIERA LOS DROPMENU CUANDO SE ESCUCHA UNA ACCION FUERA DE ESTOS O DE SUS BOTONES DE INTERACCION */
  document.addEventListener('click', async(e) => {
    let element = e.target.classList
    if (!element.contains('dropbutton-action') && !element.contains('dropmenu-item')) await this.closeDropLog();
  })
  await this.accionarDropLog();
}


async function accionarDropLog() {
  let dropButtons = document.querySelectorAll('.dropbutton-action') //BOTON PARA ACCIONAR EL DROPMENU
  dropButtons.forEach((button) => {
    button.addEventListener('click', async(_e) => {
      //VALIDADOR PARA AGREGAR O QUITAR LA CLASE 'ACTIVE' AL BUTTON
      if (!button.classList.contains('active')) {
        await this.closeDropLog();
      }
      button.classList.toggle('active')
      await this.alternateEfectDropLog(button)
    })
  })
}

async function alternateEfectDropLog(element) {
  /*ALTERNA EL DESPLIEGIE DEL ELEMENTO 'DROPMENU'*/
  console.log('despliega')
  let dataDropMenu = element.getAttribute('data-dropmenu')
  console.log(dataDropMenu)
  let dropMenu = document.querySelector(`#${dataDropMenu}`)
  if (dropMenu) {
    dropMenu.classList.toggle('show');
    dropMenu.classList.toggle('dropmenu-item');
  }
}

async function closeDropLog() {
  //FUNCION PARA DESACTIVAR TODOS LOS DROPMENU ACTIVOS
  let dropMenusShow = document.querySelectorAll('.dropmenu.show')
  let dropButtonsActive = document.querySelectorAll('.dropbutton-action.active')
  dropMenusShow.forEach(dropMenu => {
    dropMenu.classList.remove('show');
    dropMenu.classList.remove('dropmenu-item');
  })

  dropButtonsActive.forEach(dropButton => {
    dropButton.classList.remove('active')
  })
}

/************** READ ME *************/
/*

CLASE dropmenu
  Esta clase referencia al elemento despegable que aparece al interactuar con el elemento 'DROPBUTTON-ACTION'

CLASE dropbutton-action
  Esta clase se usa en los elementos que dispararán la interaccion del despegable 'DROPMENU'

CLASE dropmenu-item
  La usamos en elementos hijos del elemento padre 'DROPMENU' cuya interaccion no queremos que repercuta en la interaccion del desplegable del 'DROPMENU'

CLASE dropbutton-hidden
  La usamos en elementos hijos del elemento padre 'DROPBUTTON-ACTION' para evitar la interferencia con la accion del elemento padre 'DROPBUTTON-ACTION'

  */