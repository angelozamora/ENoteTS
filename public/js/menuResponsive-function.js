let menuResOp = document.querySelectorAll('.menu-responsive-option');

function menuResponsive() {

    let sidebar = document.getElementById('sidebar')
    let sidebarBack = document.getElementById('sidebar-back')

    if (sidebar.classList.contains('sidebar-active')) {
        sidebar.classList.remove('sidebar-active')
        sidebarBack.style.display = 'none';
    } else {
        sidebar.classList.add('sidebar-active')
        sidebarBack.style.display = 'block';
    }



}