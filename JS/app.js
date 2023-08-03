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

$('#myCarousel .carousel-item img').on('click', function () {
  var src = $(this).attr('src');
  $('#imagenAmpliada').attr('src', src);
  $('#imagenModal').modal('show');
});