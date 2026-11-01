// menu del celu
var menu = document.getElementById('menu-celu');
var botonAbrir = document.getElementById('abrir-menu');
var botonCerrar = document.getElementById('cerrar-menu');

function abrirMenu() {
    menu.classList.remove('hidden');
    botonAbrir.setAttribute('aria-expanded', 'true');
    botonCerrar.focus();
}

function cerrarMenu() {
    menu.classList.add('hidden');
    botonAbrir.setAttribute('aria-expanded', 'false');
    botonAbrir.focus();
}

botonAbrir.addEventListener('click', abrirMenu);
botonCerrar.addEventListener('click', cerrarMenu);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) cerrarMenu();
});

// carrusel
var slides = document.querySelectorAll('.slide');
var contenedorPuntos = document.getElementById('puntos');
var actual = 0;

for (var i = 0; i < slides.length; i++) {
    var p = document.createElement('button');
    p.type = 'button';
    p.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
    p.className = 'punto w-3 h-3 rounded-full border border-white foco';
    p.dataset.n = i;
    p.addEventListener('click', function () {
        mostrar(Number(this.dataset.n));
    });
    contenedorPuntos.appendChild(p);
}

function mostrar(n) {
    actual = (n + slides.length) % slides.length;
    var puntos = document.querySelectorAll('.punto');
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.toggle('hidden', i !== actual);
        puntos[i].classList.toggle('bg-white', i === actual);
    }
}

document.getElementById('anterior').addEventListener('click', function () { mostrar(actual - 1); });
document.getElementById('siguiente').addEventListener('click', function () { mostrar(actual + 1); });
mostrar(0);

// bloques desplegables 
var titulos = document.querySelectorAll('.titulo-bloque');
for (var j = 0; j < titulos.length; j++) {
    titulos[j].addEventListener('click', function () {
        var panel = this.parentElement.nextElementSibling;
        var abierto = this.getAttribute('aria-expanded') === 'true';
        panel.classList.toggle('hidden', abierto);
        this.setAttribute('aria-expanded', !abierto);
        this.querySelector('.flecha').textContent = abierto ? '▾' : '▴';
    });
}

// ver ubicacion
var seccionMapa = document.getElementById('ubicacion');
document.getElementById('ver-ubicacion').addEventListener('click', function () {
    seccionMapa.focus({ preventScroll: true });
    seccionMapa.scrollIntoView({ behavior: 'smooth' });
});

// Agregar o quitar del recorrido
let cantidad = 0;
let actividades = '';

let botonRecorrido = document.getElementById('agregar-recorrido');
let mensaje = document.getElementById('mensaje-recorrido');
let carrito = document.getElementById('ver-carrito');
let carritoCelu = document.getElementById('ver-carrito-celu');

let popup = document.getElementById('popup-actividades');
let anfiteatro = document.getElementById('check-anfiteatro');
let naranjos = document.getElementById('check-naranjos');
let confirmar = document.getElementById('confirmar-actividades');
let cancelar = document.getElementById('cancelar-actividades');

function actualizarCarrito() {
    if (cantidad === 0) {
        carrito.textContent = 'Mi carrito';
        carritoCelu.textContent = 'Mi carrito';
        botonRecorrido.textContent = 'Agregar al carrito';
    } else {
        carrito.textContent = 'Mi carrito (' + cantidad + ')';
        carritoCelu.textContent = 'Mi carrito (' + cantidad + ')';
        botonRecorrido.textContent = 'Quitar del carrito';
    }
}

botonRecorrido.addEventListener('click', function () {
    if (cantidad === 0) {
        anfiteatro.checked = true;
        naranjos.checked = true;
        popup.style.display = 'flex';
        anfiteatro.focus();
    } else {
        cantidad = 0;
        actividades = '';
        mensaje.textContent = 'Se quitaron las actividades.';
        actualizarCarrito();
    }
});

confirmar.addEventListener('click', function () {
    if (anfiteatro.checked === false && naranjos.checked === false) {
        alert('Seleccioná al menos una actividad.');
        return;
    }

    cantidad = 0;
    actividades = '';

    if (anfiteatro.checked === true) {
        cantidad = cantidad + 1;
        actividades = 'Anfiteatro Homero y Virgilio Expósito\n';
    }

    if (naranjos.checked === true) {
        cantidad = cantidad + 1;
        actividades = actividades + 'Paseo de los Naranjos\n';
    }

    actualizarCarrito();
    mensaje.textContent = 'Actividades guardadas.';
    cerrarPopup();
});

function cerrarPopup() {
    popup.style.display = 'none';
    botonRecorrido.focus();
}

cancelar.addEventListener('click', cerrarPopup);

document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && popup.style.display === 'flex') {
        cerrarPopup();
    }
});

function mostrarCarrito() {
    if (cantidad === 0) {
        alert('Todavía no agregaste ninguna actividad.');
    } else {
        alert('Tus actividades:\n\n' + actividades);
    }
}

carrito.addEventListener('click', mostrarCarrito);
carritoCelu.addEventListener('click', mostrarCarrito);