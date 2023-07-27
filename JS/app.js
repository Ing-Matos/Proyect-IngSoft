// Función para ampliar una imagen al hacer clic en ella
function ampliarImagen(src) {
    var modal = $('<div class="modal">').css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
    });

    var img = $('<img>').attr('src', src).css({
      maxWidth: '90%',
      maxHeight: '90%',
      objectFit: 'contain',
      cursor: 'pointer'
    }).click(function () {
      modal.remove();
    });

    modal.append(img).appendTo('body');
  }

  // Esperar a que el documento esté listo
  $(document).ready(function () {
    // Asignar el evento clic a las imágenes del carrusel
    $('.carousel-item img').click(function () {
      var src = $(this).attr('src');
      ampliarImagen(src);
    });
  });