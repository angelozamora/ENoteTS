document.addEventListener('DOMContentLoaded', function() {
    let message = JSON.parse(document.getElementById('message').getAttribute('data'));
    console.log(message.res[0].type)
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
        allowOutsideClick: 'false',
        allowEscapeKey: 'false',
        background: '#181818',
        customClass: {
            title: 'text-color',
        }
    })
}