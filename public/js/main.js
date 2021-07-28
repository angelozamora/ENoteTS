document.addEventListener('DOMContentLoaded', function() {
  let message = JSON.parse(document.getElementById('message').getAttribute('data'));
  if (message.res) {
    if (message.res[0].type == "error") {
      swalMessage(message.res[0].type, message.res[0].msg, )
    } else if (message.res[0].type == "success") {
      swalMessage(message.res[0].type, message.res[0].msg, )
    } else if (message.res[0].type == "info") {
      swalMessage(message.res[0].type, message.res[0].msg, )
    }
  }

})

document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('click', function(e) {
    console.log(e.target)
    if (!e.target.classList.contains('appMenu') && !e.target.classList.contains('dropdown-appItem')) {
      closeDropDown();
    }
  })


  let appMenus = document.querySelectorAll('.appMenu')
  appMenus.forEach(menu => {
    menu.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active')
      } else {
        closeDropDown();
        menu.classList.add('active')
      }

      let dataMenu = menu.getAttribute('data-menu')
      let dropdownMenu = document.querySelector(`#${dataMenu}`)
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
        dropdownMenu.classList.toggle('dropdown-appItem');
      }
    })
  })
})

function closeDropDown() {
  let dropdownMenuActive = document.querySelectorAll('.dropdown-appMenu.show')
  let appMenuActive = document.querySelectorAll('.appMenu.active')
  dropdownMenuActive.forEach(dropdownMenu => {
    console.log('hola')
    dropdownMenu.classList.remove('show');
  })

  appMenuActive.forEach(appMenu => {
    appMenu.classList.remove('active')
  })
}


function swalMessage(type, msg) {
  Swal.fire({
    title: msg,
    icon: type,
    confirmButtonText: 'OK',
    timer: 3500,
    background: '#181818',
    customClass: {
      title: 'text-color',
    }
  })
}

function loadForm() {
  Swal.fire({
    title: 'Loaded..',
    text: 'Performing the process, please wait!',
    icon: 'info',
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: '#181818',
    customClass: {
      title: 'text-color',
    }
  })
}

function confirmMessage(msg) {
  Swal.fire({
    title: msg,
    icon: 'success',
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: '#181818',
    showConfirmButton: false,
    customClass: {
      title: 'text-color',
    }
  })
}