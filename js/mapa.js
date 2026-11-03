// Mapa del recorrido con Leaflet y OpenStreetMap (no necesita clave de API)

let paradas = [
    { nombre: 'Paseo Costanera', tipo: 'Atractivo natural', lat: -34.10422, lng: -59.00586, pagina: 'paseo-costanera.html' },
    { nombre: 'Paseo de los Naranjos', tipo: 'Capital del Tango', lat: -34.10603, lng: -59.01426, pagina: 'capital-del-tango.html' },
    { nombre: 'Anfiteatro Homero y Virgilio Expósito', tipo: 'Capital del Tango', lat: -34.10068, lng: -59.01920, pagina: 'capital-del-tango.html' },
    { nombre: 'Teatro Coliseo', tipo: 'Teatro y espectáculos', lat: -34.09756, lng: -59.02206, pagina: 'teatro-coliseo.html' },
    { nombre: 'Kartódromo Internacional', tipo: 'Karting y aventura', lat: -34.15307, lng: -59.10281, pagina: 'kartodromo.html' }
];

let contenedorMapa = document.getElementById('mapa');

if (typeof L === 'undefined') {
    // si no se pudo cargar la biblioteca, queda la lista de paradas
    contenedorMapa.textContent = 'No se pudo cargar el mapa. Podés usar la lista de paradas para ver cada lugar.';
    contenedorMapa.className = 'flex items-center justify-center p-6 text-center rounded-2xl bg-celeste';
} else {
    let mapa = L.map('mapa', { scrollWheelZoom: false });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    let puntos = [];
    let marcadores = [];

    for (let i = 0; i < paradas.length; i++) {
        let parada = paradas[i];
        puntos.push([parada.lat, parada.lng]);

        let icono = L.divIcon({
            className: '',
            html: '<span class="marcador-mapa">' + (i + 1) + '</span>',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        let marcador = L.marker([parada.lat, parada.lng], {
            icon: icono,
            title: (i + 1) + '. ' + parada.nombre,
            alt: 'Parada ' + (i + 1) + ': ' + parada.nombre
        }).addTo(mapa);

        let contenido = document.createElement('div');
        let titulo = document.createElement('strong');
        titulo.textContent = (i + 1) + '. ' + parada.nombre;
        let enlace = document.createElement('a');
        enlace.href = parada.pagina;
        enlace.textContent = 'Ver más';
        enlace.className = 'block mt-1 underline font-semibold';
        contenido.appendChild(titulo);
        contenido.appendChild(enlace);

        marcador.bindPopup(contenido);
        marcadores.push(marcador);
    }

    // linea punteada que une las paradas en el orden sugerido
    L.polyline(puntos, { color: '#2f6a82', weight: 3, dashArray: '6 8' }).addTo(mapa);
    mapa.fitBounds(puntos, { padding: [30, 30] });

    // al elegir una parada de la lista, el mapa se centra en ella
    let botones = document.querySelectorAll('.ver-parada');

    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', function () {
            let n = Number(this.dataset.parada);
            mapa.setView([paradas[n].lat, paradas[n].lng], 16);
            marcadores[n].openPopup();
            contenedorMapa.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
}
