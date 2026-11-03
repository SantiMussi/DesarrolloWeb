let cantidad = 0;
let minutos = 0;
let total = 0;
let cantidadesValidas = true;

let precioTeatro = 5000;
let precioKarting = 15000;

let costanera = document.getElementById('actividad-costanera');
let naranjos = document.getElementById('actividad-naranjos');
let anfiteatro = document.getElementById('actividad-anfiteatro');
let teatro = document.getElementById('actividad-teatro');
let karting = document.getElementById('actividad-karting');
let campoTeatro = document.getElementById('cantidad-teatro');
let campoKarting = document.getElementById('cantidad-karting');
let nombre = document.getElementById('nombre');
let correo = document.getElementById('correo');
let telefono = document.getElementById('telefono');
let formulario = document.getElementById('formulario-experiencia');
let resumen = document.getElementById('resumen');
let error = document.getElementById('error-formulario');
let pago = document.getElementById('pago');
let metodoPago = document.getElementById('metodo-pago');

function sumarActividad(casilla, paso, duracion) {
    if (casilla.checked === true) {
        cantidad = cantidad + 1;
        minutos = minutos + duracion;
        document.getElementById(paso).style.display = 'list-item';
    } else {
        document.getElementById(paso).style.display = 'none';
    }
}

function calcular() {
    cantidad = 0;
    minutos = 0;
    total = 0;
    cantidadesValidas = true;
    error.textContent = '';

    sumarActividad(teatro, 'paso-teatro', 90);
    sumarActividad(anfiteatro, 'paso-anfiteatro', 30);
    sumarActividad(costanera, 'paso-costanera', 60);
    sumarActividad(naranjos, 'paso-naranjos', 45);
    sumarActividad(karting, 'paso-karting', 30);

    if (teatro.checked === true) {
        document.getElementById('opciones-teatro').style.display = 'block';
        campoTeatro.disabled = false;
        let personasTeatro = Number(campoTeatro.value);

        if (personasTeatro >= 1 && personasTeatro % 1 === 0) {
            let subtotalTeatro = personasTeatro * precioTeatro;
            total = total + subtotalTeatro;
            document.getElementById('detalle-teatro').textContent = personasTeatro + ' entrada(s) · $ ' + subtotalTeatro;
            document.getElementById('resumen-teatro').textContent = personasTeatro + ' entrada(s). Subtotal: $ ' + subtotalTeatro + '.';
        } else {
            cantidadesValidas = false;
            document.getElementById('detalle-teatro').textContent = 'Revisá la cantidad de entradas.';
            document.getElementById('resumen-teatro').textContent = '';
        }
    } else {
        document.getElementById('opciones-teatro').style.display = 'none';
        campoTeatro.disabled = true;
        document.getElementById('detalle-teatro').textContent = 'No seleccionado';
        document.getElementById('resumen-teatro').textContent = '';
    }

    if (karting.checked === true) {
        document.getElementById('opciones-karting').style.display = 'block';
        campoKarting.disabled = false;
        let personasKarting = Number(campoKarting.value);

        if (personasKarting >= 1 && personasKarting % 1 === 0) {
            let subtotalKarting = personasKarting * precioKarting;
            total = total + subtotalKarting;
            document.getElementById('detalle-karting').textContent = personasKarting + ' participante(s) · $ ' + subtotalKarting;
            document.getElementById('resumen-karting').textContent = personasKarting + ' participante(s). Subtotal: $ ' + subtotalKarting + '.';
        } else {
            cantidadesValidas = false;
            document.getElementById('detalle-karting').textContent = 'Revisá la cantidad de participantes.';
            document.getElementById('resumen-karting').textContent = '';
        }
    } else {
        document.getElementById('opciones-karting').style.display = 'none';
        campoKarting.disabled = true;
        document.getElementById('detalle-karting').textContent = 'No seleccionado';
        document.getElementById('resumen-karting').textContent = '';
    }

    if (cantidad === 0) {
        document.getElementById('cantidad-seleccionada').textContent = 'Todavía no elegiste actividades.';
        document.getElementById('contador-carrito').textContent = '';
        document.getElementById('contador-carrito-celu').textContent = '';
    } else {
        document.getElementById('cantidad-seleccionada').textContent = 'Actividades seleccionadas: ' + cantidad;
        document.getElementById('contador-carrito').textContent = ' (' + cantidad + ')';
        document.getElementById('contador-carrito-celu').textContent = ' (' + cantidad + ')';
    }

    document.getElementById('duracion-seleccion').textContent = minutos + ' minutos';

    if (cantidadesValidas === true) {
        document.getElementById('total-seleccion').textContent = '$ ' + total;
        document.getElementById('estado-calculo').textContent = 'Selección actual: ' + cantidad + ' actividad(es). Total: $ ' + total + '.';
    } else {
        document.getElementById('total-seleccion').textContent = 'Por calcular';
        document.getElementById('estado-calculo').textContent = 'Revisá las cantidades de las actividades pagas.';
    }
}

costanera.addEventListener('change', calcular);
naranjos.addEventListener('change', calcular);
anfiteatro.addEventListener('change', calcular);
teatro.addEventListener('change', calcular);
karting.addEventListener('change', calcular);
campoTeatro.addEventListener('input', calcular);
campoKarting.addEventListener('input', calcular);

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    calcular();

    if (cantidad === 0) {
        error.textContent = 'Elegí al menos una actividad para armar tu itinerario.';
        costanera.focus();
        return;
    }

    if (cantidadesValidas === false) {
        error.textContent = 'Ingresá una cantidad entera y mayor que cero para cada actividad paga seleccionada.';
        return;
    }

    if (nombre.value.trim() === '') {
        document.getElementById('error-nombre').textContent =
            'Completá tu nombre y apellido.';

        nombre.focus();
        return;
    }
    if (telefono.value.trim() === '') {
        document.getElementById('error-telefono').textContent =
            'Completá tu número de teléfono.';

        telefono.focus();
        return;
    }

    document.getElementById('resumen-nombre').textContent = nombre.value;
    document.getElementById('resumen-correo').textContent = correo.value + '@gmail.com';
    document.getElementById('resumen-telefono').textContent = telefono.value;
    document.getElementById('resumen-duracion').textContent = minutos + ' minutos de actividades';
    document.getElementById('resumen-total').textContent = '$ ' + total;

    if (total > 0) {
        document.getElementById('confirmar-solicitud').textContent = 'Continuar al pago';
    } else {
        document.getElementById('confirmar-solicitud').textContent = 'Confirmar recorrido gratuito';
    }

    document.getElementById('acciones-resumen').style.display = 'flex';
    document.getElementById('confirmacion').style.display = 'none';
    pago.style.display = 'none';
    metodoPago.value = '';
    document.getElementById('error-pago').textContent = '';

    prepararMapa();

    formulario.style.display = 'none';
    resumen.style.display = 'block';
    document.getElementById('titulo-resumen').focus();
});

document.getElementById('modificar').addEventListener('click', function () {
    resumen.style.display = 'none';
    formulario.style.display = 'block';
    costanera.focus();
});

document.getElementById('confirmar-solicitud').addEventListener('click', function () {
    document.getElementById('acciones-resumen').style.display = 'none';

    if (total > 0) {
        document.getElementById('importe-pago').textContent = '$ ' + total;
        pago.style.display = 'block';
        document.getElementById('titulo-pago').focus();
    } else {
        finalizarSolicitud();
    }
});

document.getElementById('volver-resumen').addEventListener('click', function () {
    pago.style.display = 'none';
    document.getElementById('acciones-resumen').style.display = 'flex';
    document.getElementById('confirmar-solicitud').focus();
});

document.getElementById('confirmar-pago').addEventListener('click', function () {
    if (metodoPago.value === '') {
        document.getElementById('error-pago').textContent = 'Elegí Mercado Pago, tarjeta de crédito o tarjeta de débito para continuar.';
        metodoPago.focus();
        return;
    }

    finalizarSolicitud();
});

metodoPago.addEventListener('change', function () {
    document.getElementById('error-pago').textContent = '';
});

function finalizarSolicitud() {
    pago.style.display = 'none';

    if (total > 0) {
        document.getElementById('resultado-pago').textContent = 'Medio de pago: ' + metodoPago.value + '. Total: $ ' + total + '.';
    } else {
        document.getElementById('resultado-pago').textContent = 'Tu recorrido es gratuito. No necesitás realizar un pago.';
    }

    document.getElementById('confirmacion').style.display = 'block';
    document.getElementById('titulo-confirmacion').focus();
}

// si viene de una pagina de lugar, deja marcadas sus actividades
let actividadesElegidas = (new URLSearchParams(window.location.search).get('actividad') || '').split(',');

if (actividadesElegidas.includes('costanera')) costanera.checked = true;
if (actividadesElegidas.includes('naranjos')) naranjos.checked = true;
if (actividadesElegidas.includes('anfiteatro')) anfiteatro.checked = true;
if (actividadesElegidas.includes('teatro')) teatro.checked = true;
if (actividadesElegidas.includes('karting')) karting.checked = true;

calcular();

function agregarValidacion(campo, idMensaje, mensajeVacio, mensajeFormato) {
    let mensaje = document.getElementById(idMensaje);

    function revisarCampo() {
        if (campo.value.trim() === '') {
            mensaje.textContent = mensajeVacio;
        } else if (campo.validity.valid === false) {
            mensaje.textContent = mensajeFormato;
        } else {
            mensaje.textContent = '';
        }
    }

    campo.addEventListener('invalid', revisarCampo);

    campo.addEventListener('blur', revisarCampo);

    campo.addEventListener('input', function () {
        if (mensaje.textContent !== '') {
            revisarCampo();
        }
    });
}

agregarValidacion(
    nombre,
    'error-nombre',
    'Completá tu nombre y apellido.',
    'Revisá el nombre y apellido ingresado.'
);

agregarValidacion(
    correo,
    'error-correo',
    'Completá tu usuario de Gmail, por ejemplo: paula.maestri.',
    'Escribí solo tu usuario, sin @gmail.com.'
);

agregarValidacion(
    telefono,
    'error-telefono',
    'Completá tu número de teléfono.',
    'Usá entre 8 y 15 números, sin espacios ni guiones. Podés comenzar con +.'
);

let origenMapa = '';
let destinoMapa = '';
let paradasMapa = '';

function agregarParada(lugar) {
    if (origenMapa === '') {
        origenMapa = lugar;
    } else {
        if (destinoMapa !== '') {
            if (paradasMapa !== '') {
                paradasMapa = paradasMapa + '%7C';
            }

            paradasMapa = paradasMapa + destinoMapa;
        }

        destinoMapa = lugar;
    }
}

function prepararMapa() {
    origenMapa = '';
    destinoMapa = '';
    paradasMapa = '';

    if (teatro.checked === true) {
        agregarParada('Teatro+Coliseo+19+de+Marzo+314+Zarate+Buenos+Aires');
    }

    if (anfiteatro.checked === true) {
        agregarParada('Anfiteatro+Homero+Exposito+Plaza+Italia+Zarate+Buenos+Aires');
    }

    if (costanera.checked === true) {
        agregarParada('Parque+Costanera+Luis+Rocha+Zarate+Buenos+Aires');
    }

    if (naranjos.checked === true) {
        agregarParada('Paseo+de+los+Naranjos+Dorrego+Zarate+Buenos+Aires');
    }

    if (karting.checked === true) {
        agregarParada('Kartodromo+Internacional+de+Zarate+Ruta+193+km+8.5');
    }

    let enlaceMapa = document.getElementById('abrir-mapa');

    mostrarOpcion(teatro, 'opcion-teatro');
    mostrarOpcion(anfiteatro, 'opcion-anfiteatro');
    mostrarOpcion(costanera, 'opcion-costanera');
    mostrarOpcion(naranjos, 'opcion-naranjos');
    mostrarOpcion(karting, 'opcion-karting');

    document.getElementById('parada-mapa').value = origenMapa;
    actualizarVistaMapa();

    if (destinoMapa === '') {
        enlaceMapa.href = 'https://www.google.com/maps/search/?api=1&query=' + origenMapa;
        enlaceMapa.textContent = 'Ver ubicación en Google Maps';
    } else {
        let modo = 'walking';
        enlaceMapa.textContent = 'Ver recorrido en Google Maps';

        if (karting.checked === true) {
            modo = 'driving';
        }

        let enlace = 'https://www.google.com/maps/dir/?api=1'
            + '&origin=' + origenMapa
            + '&destination=' + destinoMapa
            + '&travelmode=' + modo;

        if (paradasMapa !== '') {
            enlace = enlace + '&waypoints=' + paradasMapa;
        }

        enlaceMapa.href = enlace;
    }
}

function mostrarOpcion(casilla, idOpcion) {
    let opcion = document.getElementById(idOpcion);

    if (casilla.checked === true) {
        opcion.hidden = false;
        opcion.disabled = false;
    } else {
        opcion.hidden = true;
        opcion.disabled = true;
    }
}

function actualizarVistaMapa() {
    let parada = document.getElementById('parada-mapa').value;
    document.getElementById('vista-mapa').src = 'https://www.google.com/maps?q=' + parada + '&output=embed';
}

document.getElementById('parada-mapa').addEventListener('change', actualizarVistaMapa);
