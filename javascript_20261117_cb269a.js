document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú móvil (Toggle)
  const botonMenu = document.querySelector('.boton-menu');
  const menu = document.getElementById('menu');
  
  if (botonMenu && menu) {
    botonMenu.addEventListener('click', () => {
      const abierto = menu.classList.toggle('abierto');
      botonMenu.setAttribute('aria-expanded', abierto);
      
      // Cambiar icono hamburguesa a cruz
      const svg = botonMenu.querySelector('svg');
      if (abierto) {
        svg.innerHTML = '<path d="M6 6l12 12M18 6L6 18"/>';
      } else {
        svg.innerHTML = '<path d="M4 8h16M4 16h16"/>';
      }
    });

    // Cerrar menú al hacer clic en un enlace
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.querySelector('svg').innerHTML = '<path d="M4 8h16M4 16h16"/>';
      });
    });
  }

  // 2. Botones de acción (Ingresar / Registro / Quiero sumarme)
  // Como es solo la landing, simulamos la acción mostrando un alert o abriendo el modal
  const botonesAccion = document.querySelectorAll('[data-accion="ir-registro"], [data-accion="ir-ingreso"]');
  botonesAccion.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Esta es la landing page. Aquí se redirigiría al sistema de registro/login.');
    });
  });

  // 3. Modales para los bloques Bento
  const modalFondo = document.getElementById('modal-fondo');
  const bloques = document.querySelectorAll('.bloque[data-modulo]');

  const datosModulos = {
    locales: {
      titulo: "Locales verificados",
      bajada: "Restaurantes, cafés y dietéticas con protocolo sin TACC y mapa por cercanía.",
      items: [
        { titulo: "Panadería Central", meta: "Panificados · Centro", badge: "Verificado" },
        { titulo: "Café de la Plaza", meta: "Café · A 500m", badge: "Verificado" },
        { titulo: "Dietética Saludable", meta: "Dietética · Belgrano", badge: "En revisión" }
      ]
    },
    recetas: {
      titulo: "Recetas paso a paso",
      bajada: "Ideas sin TACC organizadas por momento del día, con tiempos e información nutricional.",
      items: [
        { titulo: "Bowl de Quinoa", meta: "Almuerzo · 20 min · 2 porciones", badge: "350 kcal" },
        { titulo: "Tostadas de Arroz", meta: "Desayuno · 10 min · 1 porción", badge: "200 kcal" },
        { titulo: "Ñoquis de Papa", meta: "Cena · 40 min · 4 porciones", badge: "450 kcal" }
      ]
    },
    productos: {
      titulo: "Productos y precios",
      bajada: "Compará productos aptos por categoría y descubrí en qué locales conseguirlos.",
      items: [
        { titulo: "Galletitas de Avena", meta: "Marca: Sin Tacc · Snacks", badge: "$1.200" },
        { titulo: "Pan de Miga", meta: "Marca: Deli · Panificados", badge: "$2.500" },
        { titulo: "Cerveza Artesanal", meta: "Marca: Libre · Bebidas", badge: "$1.800" }
      ]
    },
    comunidad: {
      titulo: "Reseñas de la comunidad",
      bajada: "Experiencias reales de otras personas celíacas sobre atención, menú y contaminación cruzada.",
      items: [
        { titulo: "Sofía M. · ★★★★★", meta: "Excelente atención y menú 100% libre de gluten.", badge: "Comunidad" },
        { titulo: "Lucas G. · ★★★★★", meta: "La verificación de locales me da mucha tranquilidad.", badge: "Comunidad" },
        { titulo: "Mariana T. · ★★★★★", meta: "Me ayudó a llegar a clientes que valoran lo que ofrezco.", badge: "Comunidad" }
      ]
    },
    puntos: {
      titulo: "Puntos y descuentos",
      bajada: "Sumás 1 punto cada $1.000 en comercios aliados y canjeás cupones con código QR.",
      items: [
        { titulo: "Cupón de $500 de descuento", meta: "Canje directo mostrando tu QR en caja", badge: "500 pts" },
        { titulo: "Cupón de $1.000 de descuento", meta: "Canje directo mostrando tu QR en caja", badge: "1.000 pts" },
        { titulo: "Cupón de $2.000 de descuento", meta: "Canje directo mostrando tu QR en caja", badge: "2.000 pts" }
      ]
    }
  };

  bloques.forEach(bloque => {
    bloque.addEventListener('click', () => {
      const modulo = bloque.getAttribute('data-modulo');
      const info = datosModulos[modulo];
      
      if (!info) return;

      const html = `
        <div class="modal">
          <h2>${info.titulo}</h2>
          <p class="suave" style="margin:6px 0 0">${info.bajada}</p>
          <div class="preview-modal-lista">
            ${info.items.map(it => `
              <div class="preview-modal-item">
                <div><strong>${it.titulo}</strong><span>${it.meta}</span></div>
                <span class="etiqueta">${it.badge}</span>
              </div>
            `).join('')}
          </div>
          <div class="fila-botones">
            <button class="btn" style="flex:1" onclick="alert('Redirigiendo a registro...')">Crear cuenta gratis</button>
            <button class="btn btn-secundario" id="cerrar-modal">Cerrar</button>
          </div>
        </div>
      `;

      modalFondo.innerHTML = html;
      modalFondo.style.display = 'flex';

      // Cerrar modal
      document.getElementById('cerrar-modal').addEventListener('click', () => {
        modalFondo.style.display = 'none';
      });

      // Cerrar al hacer clic en el fondo
      modalFondo.addEventListener('click', (e) => {
        if (e.target === modalFondo) {
          modalFondo.style.display = 'none';
        }
      });
    });
  });
});