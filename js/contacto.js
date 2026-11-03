let formulario = document.getElementById('formulario-contacto');
let nombre = document.getElementById('nombre');
let correo = document.getElementById('correo');
let motivo = document.getElementById('motivo');
let mensaje = document.getElementById('mensaje');
let contadorMensaje = document.getElementById('contador-mensaje');
let errorGeneral = document.getElementById('error-general');
let confirmacion = document.getElementById('confirmacion');

// cada funcion devuelve el texto del error, o '' si el dato esta bien
function revisarNombre() {
    let texto = nombre.value.trim();

    if (texto === '') {
        return 'Completá tu nombre.';
    }
    if (texto.length < 3) {
        return 'El nombre es muy corto. Escribí al menos 3 letras.';
    }
    return '';
}

function revisarCorreo() {
    let texto = correo.value.trim();

    if (texto === '') {
        return 'Completá tu correo electrónico.';
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto) === false) {
        return 'Revisá el correo. Tiene que tener este formato: nombre@ejemplo.com.';
    }
    return '';
}

function revisarMotivo() {
    if (motivo.value === '') {
        return 'Elegí el motivo de tu consulta.';
    }
    return '';
}

function revisarMensaje() {
    let texto = mensaje.value.trim();

    if (texto === '') {
        return 'Escribí tu mensaje.';
    }
    if (texto.length < 10) {
        return 'El mensaje es muy corto. Contanos un poco más (mínimo 10 caracteres).';
    }
    return '';
}

function mostrarError(campo, idError, texto) {
    document.getElementById(idError).textContent = texto;

    if (texto === '') {
        campo.removeAttribute('aria-invalid');
    } else {
        campo.setAttribute('aria-invalid', 'true');
    }
}

function agregarValidacion(campo, idError, revisar) {
    // al salir del campo se avisa, y despues se corrige mientras escribe
    campo.addEventListener('blur', function () {
        mostrarError(campo, idError, revisar());
    });

    campo.addEventListener('input', function () {
        if (document.getElementById(idError).textContent !== '') {
            mostrarError(campo, idError, revisar());
        }
    });
}

agregarValidacion(nombre, 'error-nombre', revisarNombre);
agregarValidacion(correo, 'error-correo', revisarCorreo);
agregarValidacion(motivo, 'error-motivo', revisarMotivo);
agregarValidacion(mensaje, 'error-mensaje', revisarMensaje);

mensaje.addEventListener('input', function () {
    contadorMensaje.textContent = mensaje.value.length + ' de 500 caracteres';
});

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    let errores = [
        { campo: nombre, id: 'error-nombre', texto: revisarNombre() },
        { campo: correo, id: 'error-correo', texto: revisarCorreo() },
        { campo: motivo, id: 'error-motivo', texto: revisarMotivo() },
        { campo: mensaje, id: 'error-mensaje', texto: revisarMensaje() }
    ];

    let primerError = null;
    let cantidadErrores = 0;

    for (let i = 0; i < errores.length; i++) {
        mostrarError(errores[i].campo, errores[i].id, errores[i].texto);

        if (errores[i].texto !== '') {
            cantidadErrores = cantidadErrores + 1;

            if (primerError === null) {
                primerError = errores[i].campo;
            }
        }
    }

    if (cantidadErrores > 0) {
        errorGeneral.textContent = 'No pudimos enviar tu consulta. Corregí ' + cantidadErrores + ' campo(s) marcado(s) e intentá de nuevo.';
        primerError.focus();
        return;
    }

    errorGeneral.textContent = '';

    // simulacion: no se manda a ningun servidor
    document.getElementById('confirmacion-nombre').textContent = nombre.value.trim();
    document.getElementById('confirmacion-correo').textContent = correo.value.trim();
    document.getElementById('confirmacion-motivo').textContent = motivo.value;

    formulario.style.display = 'none';
    confirmacion.style.display = 'block';
    document.getElementById('titulo-confirmacion').focus();
});

document.getElementById('enviar-otra').addEventListener('click', function () {
    formulario.reset();
    contadorMensaje.textContent = '0 de 500 caracteres';
    confirmacion.style.display = 'none';
    formulario.style.display = 'block';
    nombre.focus();
});
