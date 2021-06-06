document.addEventListener('DOMContentLoaded', function() {
    console.log('COMIENZA LA FUNCION TINY')
    tinymce.init({
        selector: '#tiny-body',
        height: 300,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar: ' undo redo | formatselect | ' +
            'bold italic forecolor backcolor  underline| alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | link image ',
        content_css: '//www.tiny.cloud/css/codepen.min.css'
    });
})