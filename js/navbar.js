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

// en la principal el navbar es transparente y toma fondo al bajar
var header = document.querySelector('header');

function revisarScroll() {
    if (window.scrollY > 40) {
        header.classList.add('bg-petroleo', 'shadow-md');
    } else {
        header.classList.remove('bg-petroleo', 'shadow-md');
    }
}

if (header.hasAttribute('data-transparente')) {
    window.addEventListener('scroll', revisarScroll);
    revisarScroll();
}
