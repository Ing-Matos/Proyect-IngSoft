$(document).ready(function() {
  // Cuando se haga scroll
  $(window).scroll(function() {
    // Obtenemos la posición actual del scroll
    var scroll = $(window).scrollTop();

    // Si el scroll es mayor a 100px (puedes ajustar este valor a tu preferencia)
    if (scroll >= 100) {
      // Agregamos la clase "fixed-top" para mantener el navbar arriba
      $(".navbar").addClass("fixed-top");

      // Agregamos la clase "navbar-scroll" para cambiar el estilo del navbar cuando haga scroll
      $(".navbar").addClass("navbar-scroll");
    } else {
      // Si el scroll es menor a 100px, removemos la clase "fixed-top" y "navbar-scroll"
      $(".navbar").removeClass("fixed-top");
      $(".navbar").removeClass("navbar-scroll");
    }
  });
});

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