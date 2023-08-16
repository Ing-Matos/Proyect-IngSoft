const galleryContainer = document.querySelector('.gallery-container');
  const galleryControlsContainer = document.querySelector('.gallery-controls');
  const galleryControls = ['previous', 'next'];
  const galleryItems = document.querySelectorAll('.gallery-item');

  $(document).ready(function(){
    $('#button-up').click(function(){
      $('body, html').animate({
        scrollTop: '0px'
      }, 300);
    });

    // Efecto de escala al hacer hover
    $('#button-up').hover(
      function() {
        $(this).stop().animate({ transform: 'scale(1.1)' }, 300);
      },
      function() {
        $(this).stop().animate({ transform: 'scale(1)' }, 300);
      }
    );

    $(window).scroll(function(){
      if( $(this).scrollTop() > 0 ){
        $('#button-up').slideDown(300);
      } else {
        $('#button-up').slideUp(300);
      }
    });
});

  class Carousel {
    constructor(container, items, controls) {
      this.carouselContainer = container;
      this.carouselControls = controls;
      this.carouselArray = [...items];
      this.modal = document.createElement('div');
      this.modal.className = 'modal';
      this.modalImage = document.createElement('img');
      this.modal.appendChild(this.modalImage);
      document.body.appendChild(this.modal);
      this.isModalOpen = false;
      this.disableCarouselControls = false;
      this.autoCarouselEnabled = true; // Estado del carrusel automático
    }

  
    updateGallery() {
      this.carouselArray.forEach((el) => {
        el.classList.remove('gallery-item-1');
        el.classList.remove('gallery-item-2');
        el.classList.remove('gallery-item-3');
        el.classList.remove('gallery-item-4');
        el.classList.remove('gallery-item-5');
      });

      this.carouselArray.slice(0, 5).forEach((el, i) => {
        el.classList.add(`gallery-item-${i + 1}`);
        el.addEventListener('click', () => this.showImage(el));
      });
    }

    moveNext() {
      if (!this.isModalOpen && !this.disableCarouselControls) {
        this.carouselArray.push(this.carouselArray.shift());
        this.updateGallery();
      }
    }

    movePrevious() {
      if (!this.isModalOpen && !this.disableCarouselControls) {
        this.carouselArray.unshift(this.carouselArray.pop());
        this.updateGallery();
      }
    }

    setControls() {
      
      this.carouselControls.forEach((control) => {
        const controlIcon = document.createElement('i');
        controlIcon.classList.add('arrow');
        if (control === 'previous') {
          controlIcon.classList.add('arrow-left');
          controlIcon.classList.add('fas', 'fa-chevron-left'); // Ícono de flecha izquierda de Font Awesome
        } else if (control === 'next') {
          controlIcon.classList.add('arrow-right');
          controlIcon.classList.add('fas', 'fa-chevron-right'); // Ícono de flecha derecha de Font Awesome
        }
    
        // Agregar estilos para aumentar el tamaño del ícono
        controlIcon.style.fontSize = '34px';
        controlIcon.style.color = "#daa520";
        controlIcon.style.cursor = "pointer";
        controlIcon.style.paddingInline = "40rem";
        controlIcon.style.display = "flex";
        controlIcon.style.marginTop = "-15rem";

        
       
    
        controlIcon.addEventListener('click', () => {
          this.stopAutoCarousel();
          if (control === 'previous') {
            this.movePrevious();
            this.resumeAutoCarousel(); // Reanudar el carrusel automático después de usar la flecha
          } else if (control === 'next') {
            this.moveNext();
            this.resumeAutoCarousel(); // Reanudar el carrusel automático después de usar la flecha
          }
        });
        galleryControlsContainer.appendChild(controlIcon);
      });

    }
  

    startAutoCarousel(intervalTime) {
      if (this.autoCarouselEnabled) {
        this.autoInterval = setInterval(() => {
          this.moveNext();
        }, intervalTime);
      }
    }

    stopAutoCarousel() {
      clearInterval(this.autoInterval);
    }

    resumeAutoCarousel() {
      if (this.autoCarouselEnabled) {
        this.startAutoCarousel(3000); // Cambia la imagen cada 3 segundos (3000 milisegundos) o el intervalo deseado
      }
    }

    
  showImage(imageElement) {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      this.modalImage.src = imageElement.src;
      this.modal.style.display = 'flex';
      this.modalImage.style.transform = 'scale(0.5)'; // Inicialmente, la imagen es más pequeña
  
      // Deshabilitar los controles del carrusel mientras el modal está abierto
      this.disableCarouselControls = true;
  
      // Deshabilitar el fondo mientras el modal está abierto
      galleryContainer.style.pointerEvents = 'none';
  
      // Forzar un reflow antes de aplicar la animación
      // Esto asegura que la transición se aplique correctamente
      this.modalImage.offsetWidth;
  
      // Aplicar la animación para agrandar la imagen
      this.modalImage.style.transform = 'scale(1)';
  
      // Mostrar la "X" para cerrar el modal
      const closeIcon = document.createElement('i');
  closeIcon.className = 'fas fa-times close-icon';
  closeIcon.style.position = 'absolute';
  closeIcon.style.top = '10px';
  closeIcon.style.right = '10px'; // Posición de la "X" en la esquina superior derecha
  closeIcon.style.color = '#fff'; // Color del icono 
  closeIcon.style.fontSize = '24px'; // Tamaño del icono 
  this.modal.appendChild(closeIcon);

  
      // Agregar evento para cerrar el modal al hacer clic en la "X"
      closeIcon.addEventListener('click', () => this.hideImage());
     
  
      // Agregar evento para cerrar el modal al hacer clic fuera de la imagen
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.hideImage();
        }
      });
    }
  }
  
  hideImage() {
    if (this.isModalOpen) {
      // Ocultar el modal configurando la propiedad display en 'none'
      this.modal.style.display = 'none';

      // Eliminar la "X" antes de ocultar el modal
      const closeIcon = this.modal.querySelector('.close-icon');
      if (closeIcon) {
        this.modal.removeChild(closeIcon);
      }

      this.isModalOpen = false;
      this.disableCarouselControls = false;

      // Habilitar el fondo nuevamente
      galleryContainer.style.pointerEvents = 'auto';
    }
  }
}

  const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
  exampleCarousel.setControls();
  exampleCarousel.startAutoCarousel(3000); // Cambia la imagen cada 3 segundos (3000 milisegundos)

//Codigo de calendario
  window.onload = function () {
    const fechaInput = document.getElementById('fecha');
    const fechaActual = new Date().toISOString().split('T')[0];
    fechaInput.min = fechaActual;

    const inputs = document.querySelectorAll('.contact-form input');
    inputs.forEach(input => {
        input.addEventListener('invalid', function (event) {
            event.preventDefault();
            this.classList.add('invalid');
        });
        input.addEventListener('input', function () {
            this.classList.remove('invalid');
        });
    });
};
