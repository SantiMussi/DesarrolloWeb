// Chat de preguntas frecuentes: responde con datos de las paginas del sitio.
// No usa ninguna API: busca palabras clave en lo que escribe el visitante.

let temas = [
    {
        palabras: ['hola', 'buenas', 'buen dia', 'buenas tardes', 'buenas noches', 'ayuda'],
        respuesta: '¡Hola! Te puedo contar sobre horarios, precios, cómo llegar y qué hacer en Zárate. Elegí una pregunta o escribí la tuya.'
    },
    {
        palabras: ['horario', 'hora', 'abre', 'abierto', 'cierra', 'cuando', 'dias'],
        respuesta: 'Horarios: la Costanera y los espacios del tango (Anfiteatro y Paseo de los Naranjos) están al aire libre y se visitan todo el día. El Teatro Coliseo abre de lunes a viernes de 16 a 20, los sábados de 9 a 00 y cierra los domingos. El karting de alquiler funciona viernes y sábados de 17 a 23, con reserva previa.'
    },
    {
        palabras: ['precio', 'cuesta', 'sale', 'costo', 'valor', 'pagar', 'tarifa', 'entrada'],
        respuesta: 'Los paseos por la Costanera, el Anfiteatro y el Paseo de los Naranjos son gratis. La función en el Teatro Coliseo sale $ 5000 por persona y el karting $ 15000 por persona. Podés calcular el total de tu grupo en Mi carrito.',
        enlace: { texto: 'Ir a Mi carrito', href: 'mi-carrito.html' }
    },
    {
        palabras: ['gratis', 'gratuito', 'sin costo', 'libre'],
        respuesta: 'Son gratis la Costanera, el Anfiteatro Homero y Virgilio Expósito y el Paseo de los Naranjos. Se pagan la función del Teatro Coliseo ($ 5000 por persona) y el karting ($ 15000 por persona).'
    },
    {
        lugar: true,
        palabras: ['karting', 'kartodromo', 'kart', 'carrera', 'pista', 'velocidad'],
        respuesta: 'Kartódromo Internacional de Zárate (Ruta 193, km 8,5): alquiler de kartings que alcanzan los 85 km/h. Funciona viernes y sábados de 17 a 23, con reserva previa. Edad mínima: 16 años. Cuesta $ 15000 por persona. Cada turno dura unos 30 minutos, con 20 en pista. Llegá 30 minutos antes y llevá pantalón largo y buzo.',
        enlace: { texto: 'Ver el Kartódromo', href: 'kartodromo.html' }
    },
    {
        lugar: true,
        palabras: ['teatro', 'coliseo', 'funcion', 'cine', 'cartelera', 'espectaculo'],
        respuesta: 'Teatro Coliseo (inaugurado en 1928): sala de espectáculos y cine. Horarios: lunes a viernes de 16 a 20, sábados de 9 a 00, domingos cerrado. La función sale $ 5000 por persona. La cartelera está en su sitio oficial y el teléfono es 03487 42-2762.',
        enlace: { texto: 'Ver el Teatro Coliseo', href: 'teatro-coliseo.html' }
    },
    {
        lugar: true,
        palabras: ['tango', 'capital', 'exposito', 'naranjo', 'naranjos', 'anfiteatro', 'festival', 'gardel'],
        respuesta: 'Zárate es Ciudad Provincial del Tango desde 2009 (Ley 14.091) y cuna de los hermanos Homero y Virgilio Expósito. Podés visitar el Anfiteatro en Plaza Italia y el Paseo de los Naranjos, en la calle Dorrego, con estrofas de "Naranjo en flor" pintadas en carteles. Para las fechas del Festival del Tango, mirá el Portal de Noticias de Zárate.',
        enlace: { texto: 'Ver Capital del Tango', href: 'capital-del-tango.html' }
    },
    {
        lugar: true,
        palabras: ['costanera', 'rio', 'parana', 'puente', 'mercado', 'comer', 'gastronomia', 'picnic', 'bicicleta', 'food truck'],
        respuesta: 'La Costanera es un circuito sobre el río Paraná con vista al puente Brazo Largo. Está abierta las 24 horas, es gratis y tiene baños públicos. Calculá unos 60 minutos para recorrerla. Está el Mercado de Zárate con mesas al aire libre, y hay ferias y food trucks. Los fines de semana hay mucha gente: conviene llegar temprano.',
        enlace: { texto: 'Ver la Costanera', href: 'paseo-costanera.html' }
    },
    {
        palabras: ['llego', 'llegar', 'ubicacion', 'donde', 'direccion', 'mapa', 'queda', 'acceso', 'estacionar'],
        respuesta: 'Ubicaciones: Teatro Coliseo (19 de Marzo 314), Anfiteatro (Plaza Italia), Paseo de los Naranjos (calle Dorrego, entre Pasaje Chaco y San Martín), Costanera (ribera del Paraná) y Kartódromo (Ruta 193, km 8,5). Cada página tiene su mapa con el botón "Abrir en Google Maps".',
        enlace: { texto: 'Ir al inicio', href: 'index.html#lugares' }
    },
    {
        palabras: ['reserv', 'carrito', 'comprar', 'armar', 'itinerario', 'solicitud', 'experiencia'],
        respuesta: 'Para armar tu recorrido: entrá a Mi carrito, marcá las actividades, indicá cuántas personas van al teatro o al karting y completá tus datos. Te mostramos el itinerario, el tiempo y el total antes de confirmar. El pago es una simulación.',
        enlace: { texto: 'Armar mi experiencia', href: 'mi-carrito.html' }
    },
    {
        palabras: ['dura', 'duracion', 'tiempo', 'tarda', 'minutos'],
        respuesta: 'Tiempos estimados: Costanera 60 minutos, Paseo de los Naranjos 45, Anfiteatro 30, función de teatro 90 y karting 30 (con preparación). Los dos puntos del tango llevan entre 1 y 1,5 horas.'
    },
    {
        palabras: ['familia', 'chicos', 'ninos', 'menores', 'edad', 'hijos'],
        respuesta: 'La Costanera es ideal para ir en familia. El karting es desde los 16 años. El Teatro Coliseo y los espacios del tango son para todo público: revisá la cartelera antes de ir.'
    },
    {
        palabras: ['recomend', 'que hacer', 'visitar', 'conocer', 'un dia', 'plan', 'sugerencia'],
        respuesta: 'Un día posible: mañana por la Costanera (60 min), almuerzo en el Mercado, tarde en el Anfiteatro y el Paseo de los Naranjos (1 a 1,5 horas) y, si es viernes o sábado, karting a la noche. Podés armarlo en Mi carrito y ver el tiempo total.',
        enlace: { texto: 'Armar mi recorrido', href: 'mi-carrito.html' }
    },
    {
        lugar: true,
        palabras: ['colapinto', 'franco', 'formula'],
        respuesta: 'Franco Colapinto dio sus primeros pasos en el automovilismo en el Kartódromo de Zárate, donde empezó a competir a los seis años.',
        enlace: { texto: 'Ver el Kartódromo', href: 'kartodromo.html' }
    },
    {
        palabras: ['contacto', 'contactar', 'escribir', 'telefono', 'mail', 'correo', 'consulta', 'mensaje'],
        respuesta: 'Podés escribirnos desde la página de contacto. Para el Teatro Coliseo, el teléfono es 03487 42-2762.',
        enlace: { texto: 'Ir a Contacto', href: 'contacto.html' }
    }
];

let sugerencias = [
    '¿Qué horarios tienen?',
    '¿Cuánto cuesta?',
    '¿Cómo llego?',
    '¿Cómo reservo?',
    '¿Qué puedo hacer en un día?'
];

let respuestaSinResultado = {
    respuesta: 'No encontré una respuesta para eso. Probá con palabras como horarios, precios, karting, teatro, tango, Costanera o cómo llegar. También podés escribirnos desde Contacto.',
    enlace: { texto: 'Ir a Contacto', href: 'contacto.html' }
};

// minusculas y sin tildes, para que "Cuánto" y "cuanto" sean lo mismo
function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function buscarRespuesta(pregunta) {
    let texto = ' ' + normalizar(pregunta).replace(/[^a-z0-9 ]/g, ' ') + ' ';
    let mejor = null;
    let mejorPuntaje = 0;

    for (let i = 0; i < temas.length; i++) {
        let puntaje = 0;

        for (let j = 0; j < temas[i].palabras.length; j++) {
            // la palabra tiene que empezar en una palabra del texto ("reserv" encuentra "reservar")
            if (texto.indexOf(' ' + normalizar(temas[i].palabras[j])) !== -1) {
                puntaje = puntaje + 1;
            }
        }

        // si hay empate, gana el tema de un lugar sobre el general
        if (puntaje > 0 && temas[i].lugar === true) {
            puntaje = puntaje + 0.5;
        }

        if (puntaje > mejorPuntaje) {
            mejorPuntaje = puntaje;
            mejor = temas[i];
        }
    }

    if (mejor === null) {
        return respuestaSinResultado;
    }
    return mejor;
}

function crear(etiqueta, clases, texto) {
    let elemento = document.createElement(etiqueta);
    elemento.className = clases;

    if (texto !== undefined) {
        elemento.textContent = texto;
    }
    return elemento;
}

// boton flotante
let botonChat = crear('button', 'fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full bg-amarillo text-texto font-semibold shadow-lg px-5 py-3 hover:brightness-95 foco-oscuro');
botonChat.type = 'button';
botonChat.setAttribute('aria-expanded', 'false');
botonChat.setAttribute('aria-controls', 'panel-chat');
botonChat.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg><span>Chat</span>';

// panel
let panel = crear('section', 'hidden fixed bottom-20 right-4 z-30 flex flex-col w-[calc(100vw-2rem)] max-w-sm h-[28rem] max-h-[calc(100vh-7rem)] rounded-2xl bg-crema text-texto shadow-2xl border border-azul/30 overflow-hidden');
panel.id = 'panel-chat';
panel.setAttribute('role', 'dialog');
panel.setAttribute('aria-label', 'Chat de preguntas frecuentes de Rutas Zárate');

let encabezado = crear('div', 'flex items-center justify-between bg-petroleo text-white px-4 py-3');
encabezado.appendChild(crear('h2', 'font-titulo font-semibold', 'Preguntas frecuentes'));

let botonCerrarChat = crear('button', 'p-1 foco');
botonCerrarChat.type = 'button';
botonCerrarChat.setAttribute('aria-label', 'Cerrar el chat');
botonCerrarChat.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';
encabezado.appendChild(botonCerrarChat);

let conversacion = crear('div', 'flex-1 overflow-y-auto px-4 py-3 space-y-3');
conversacion.setAttribute('role', 'log');
conversacion.setAttribute('aria-live', 'polite');
conversacion.setAttribute('aria-label', 'Conversación');
conversacion.tabIndex = 0;

let zonaSugerencias = crear('div', 'flex shrink-0 gap-2 overflow-x-auto px-4 pb-3');

let formularioChat = crear('form', 'flex gap-2 border-t border-azul/20 p-3 bg-white');
let etiquetaChat = crear('label', 'sr-only', 'Escribí tu pregunta');
etiquetaChat.htmlFor = 'pregunta-chat';
let campoChat = crear('input', 'min-w-0 flex-1 rounded-xl border border-azul p-2 foco-oscuro');
campoChat.id = 'pregunta-chat';
campoChat.type = 'text';
campoChat.autocomplete = 'off';
campoChat.placeholder = 'Escribí tu pregunta';
let botonEnviarChat = crear('button', 'rounded-xl bg-azul text-white font-semibold px-4 foco-oscuro', 'Enviar');
botonEnviarChat.type = 'submit';
formularioChat.appendChild(etiquetaChat);
formularioChat.appendChild(campoChat);
formularioChat.appendChild(botonEnviarChat);

panel.appendChild(encabezado);
panel.appendChild(conversacion);
panel.appendChild(zonaSugerencias);
panel.appendChild(formularioChat);

document.body.appendChild(botonChat);
document.body.appendChild(panel);

function agregarMensaje(texto, esVisitante, enlace) {
    let fila = crear('div', esVisitante ? 'flex justify-end' : 'flex justify-start');
    let burbuja = crear('div', esVisitante
        ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-azul text-white px-3 py-2 text-sm'
        : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-white border border-[#e7dcca] px-3 py-2 text-sm leading-relaxed');

    burbuja.appendChild(crear('span', 'sr-only', esVisitante ? 'Vos: ' : 'Asistente: '));
    burbuja.appendChild(document.createTextNode(texto));

    if (enlace !== undefined) {
        let link = crear('a', 'block mt-2 font-semibold text-azul underline foco-oscuro', enlace.texto);
        link.href = enlace.href;
        burbuja.appendChild(link);
    }

    fila.appendChild(burbuja);
    conversacion.appendChild(fila);
    conversacion.scrollTop = conversacion.scrollHeight;
}

function preguntar(pregunta) {
    agregarMensaje(pregunta, true);
    let tema = buscarRespuesta(pregunta);
    agregarMensaje(tema.respuesta, false, tema.enlace);
}

for (let i = 0; i < sugerencias.length; i++) {
    let boton = crear('button', 'shrink-0 whitespace-nowrap rounded-full border border-azul text-azul text-xs font-semibold px-3 py-1 hover:bg-celeste foco-oscuro', sugerencias[i]);
    boton.type = 'button';
    boton.addEventListener('click', function () {
        preguntar(sugerencias[i]);
        campoChat.focus();
    });
    zonaSugerencias.appendChild(boton);
}

agregarMensaje('¡Hola! Soy el asistente de Rutas Zárate. Elegí una pregunta o escribí la tuya.', false);

function abrirChat() {
    panel.classList.remove('hidden');
    botonChat.setAttribute('aria-expanded', 'true');
    campoChat.focus();
}

function cerrarChat() {
    panel.classList.add('hidden');
    botonChat.setAttribute('aria-expanded', 'false');
    botonChat.focus();
}

botonChat.addEventListener('click', function () {
    if (panel.classList.contains('hidden')) {
        abrirChat();
    } else {
        cerrarChat();
    }
});

botonCerrarChat.addEventListener('click', cerrarChat);

document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && panel.classList.contains('hidden') === false) {
        cerrarChat();
    }
});

formularioChat.addEventListener('submit', function (evento) {
    evento.preventDefault();
    let pregunta = campoChat.value.trim();

    if (pregunta === '') {
        campoChat.focus();
        return;
    }

    preguntar(pregunta);
    campoChat.value = '';
    campoChat.focus();
});
