let backgroundColor = "#fff";

document.addEventListener('DOMContentLoaded', function() {

  let body = document.querySelector('body')
  if (body.classList.contains('darkmode')) {
    console.log('holaaaaaaaaaa qweqwe')
    backgroundColor = "#181818"
  }

  let message = JSON.parse(document.getElementById('message').getAttribute('data'));
  console.log(message)
  if (message.res) {
    if (message.res.type == "error") {
      swalMessage(message.res.type, message.res.msg, )
    } else if (message.res.type == "success") {
      swalMessage(message.res.type, message.res.msg, )
    } else if (message.res.type == "info") {
      swalMessage(message.res.type, message.res.msg, )
    }
  }

})


function swalMessage(type, msg) {
  Swal.fire({
    title: msg,
    icon: type,
    confirmButtonText: 'OK',
    timer: 3500,
    background: backgroundColor,
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
    showConfirmButton: false,
    background: backgroundColor,
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
    background: backgroundColor,
    showConfirmButton: false,
    customClass: {
      title: 'text-color',
    }
  })
}