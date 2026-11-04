# Rutas Zárate

Sitio web de un recorrido turístico por Zárate (Buenos Aires), hecho para la Actividad 3 de Diseño y Desarrollo Web. Es el desarrollo del diseño que armamos en la Actividad 2.

- Sitio publicado: https://santimussi.github.io/DesarrolloWeb/
- Prototipo en Figma: https://www.figma.com/proto/ZT7YFmnDIppVBNY4jHEX5v/Rutas-Z%C3%A1rate?node-id=4-85&t=SkW3nNWraKT5mdiI-1
- Design System en Figma: https://www.figma.com/design/ZT7YFmnDIppVBNY4jHEX5v/Rutas-Z%C3%A1rate?node-id=0-1&t=PII6H7muIlH8mTNd-1

## De qué trata

La idea es que alguien que quiere pasar un día en Zárate pueda ver qué hay para hacer, en qué orden conviene recorrerlo y cuánto le va a salir. Elegimos Zárate porque tiene cosas bastante distintas en poco espacio: la costanera sobre el Paraná, el tango (es Ciudad Provincial del Tango desde 2009), el Teatro Coliseo y el Kartódromo.

La categoría es turismo y cultura. Está pensado para gente que viene de paso o de otras ciudades cercanas, y también para quienes viven ahí y no conocen todos los lugares. Los puntos del recorrido son cuatro:

1. Paseo Costanera
2. Capital del Tango (Anfiteatro Homero y Virgilio Expósito y Paseo de los Naranjos)
3. Teatro Coliseo
4. Kartódromo Internacional de Zárate

## Qué se puede hacer en el sitio

- **Página principal.** Presenta el recorrido, tiene las tarjetas de cada lugar y un mapa con las paradas numeradas en el orden que sugerimos (de la costanera hacia el kartódromo).
- **Páginas de cada lugar.** Descripción, carrusel de fotos con su descripción, actividades, datos útiles (horarios, ubicación, duración, recomendaciones) y mapa. Cada una tiene un botón para armar el itinerario con esa actividad ya marcada.
- **Mi carrito.** Se eligen actividades, se indica cuántas personas van a las que se pagan (teatro y karting), se completan los datos de contacto y se ve un resumen con el tiempo total, el costo y un mapa de las paradas. Después se elige un medio de pago y se confirma. Todo el pago es simulado, no se pide ningún dato de tarjeta. Al terminar el carrito se vacía y el resumen queda como comprobante.
- **Contacto.** Formulario con nombre, correo, motivo y mensaje. Valida los campos y muestra una confirmación, pero el mensaje no se envía a ningún lado (el formulario lo aclara).
- **Chat de preguntas frecuentes.** Botón flotante en todas las páginas. Responde sobre horarios, precios, cómo llegar, cómo reservar, duración y demás. No usa ninguna IA ni API: busca palabras clave en lo que se escribe y contesta con información que sale de las mismas páginas del sitio. Si no entiende, manda a la página de contacto.

Los precios del carrito son de ejemplo ($ 5000 la entrada al teatro y $ 15000 el turno de karting) y están todos en pesos argentinos. Como no hay precios en moneda extranjera, no hizo falta ninguna conversión.

## Tecnologías

- HTML5
- Tailwind CSS 3.4.17, cargado por CDN, más un archivo propio de clases (`css/componentes.css`) para lo que se repite en todas las páginas
- JavaScript sin frameworks (ni React, ni jQuery, nada de eso)
- Tipografías Poppins e Inter, de Google Fonts

### Servicios y bibliotecas externas

- **Leaflet 1.9.4 y OpenStreetMap** para el mapa de la página principal. Usamos Leaflet porque el mapa embebido de Google no permite marcar varios puntos con número sin una clave de API, y Leaflet con los mapas de OpenStreetMap no necesita ninguna. Las coordenadas de las paradas las sacamos del buscador de OpenStreetMap, así que son aproximadas.
- **Google Maps**, embebido con un iframe en cada página de lugar y en el resumen del carrito, y con botones "Abrir en Google Maps" para ver cómo llegar.

## Estructura del proyecto

```
index.html               página principal
paseo-costanera.html
capital-del-tango.html
teatro-coliseo.html
kartodromo.html
mi-carrito.html          itinerario, cálculo y pago simulado
contacto.html
css/componentes.css      clases compartidas (foco, botones, navbar fijo, mapa)
js/navbar.js             menú del celular y navbar de la principal
js/detalle.js            carrusel y bloques desplegables de las páginas de lugares
js/carrito.js            cálculo del carrito, validaciones, resumen y pago
js/contacto.js           validación del formulario de contacto
js/mapa.js               mapa de la principal
js/chat.js               chat de preguntas frecuentes
imgs/                    fotos, logo y favicon
```

## Cómo verlo

Lo más fácil es entrar al sitio publicado. Para correrlo en la compu no hace falta instalar nada: se puede abrir `index.html` directamente en el navegador, o levantar un servidor local desde la carpeta del proyecto:

```
python -m http.server 5500
```

y abrir http://localhost:5500. Hace falta internet porque Tailwind, las fuentes y el mapa se cargan desde CDN.

## Cómo lo pensamos

Algunas decisiones que tomamos y por qué:

- **Mobile primero.** Empezamos por el celular y después ampliamos. El menú de las páginas de lugares muestra un "Volver" en el celular y el menú completo desde 1024 px.
- **Navbar fijo** en todas las páginas, con la misma altura y los mismos links. En la principal es transparente sobre la foto y toma fondo al bajar.
- **Formularios.** Cada campo tiene su etiqueta, los errores aparecen al lado del campo y se leen con lector de pantalla (`role="alert"`), y al enviar con errores el foco va al primer campo con problema. En el carrito las cantidades solo aceptan números enteros desde 1.
- **Accesibilidad.** Las imágenes tienen texto alternativo y además una descripción visible debajo del carrusel. Todo se puede usar con teclado, el foco se ve en todos los elementos y el chat se cierra con Escape. El mapa tiene al lado una lista de las mismas paradas para quien no pueda usarlo.
- **Sin colores solos para transmitir algo.** Los errores llevan texto, no solo rojo.

## Quién hizo qué

**Paula Maestri**
- Armó la primera versión de la página principal y la adaptó a responsive (todavía con CSS común, antes de pasar a Tailwind).
- Creó la estructura de las páginas de Paseo Costanera, Teatro Coliseo y Kartódromo, a partir de la de Capital del Tango, y la primera versión del botón y el popup para agregar actividades.
- Hizo la página del Kartódromo completa: texto, datos útiles, ubicación y las fotos del circuito y de Colapinto.
- Hizo todo el carrito (`mi-carrito.html` y `js/carrito.js`): elección de actividades, cálculo de tiempo y total, validación de los datos, resumen con mapa de las paradas, pago simulado y confirmación.
- Conectó el carrito con el resto del sitio: el link "Mi carrito" en el menú, el botón "Armar mi experiencia" en cada lugar y los links para ir al lugar anterior y al siguiente.
- Armó el salto del botón "Ver recorrido" de la principal, con el título resaltado al llegar, y mergeó los pull requests del grupo.

**Lucía Agostino**
- Armó el contenido de las páginas de Paseo Costanera y Teatro Coliseo: títulos, descripciones, actividades, datos útiles, horarios y teléfono, y el carrusel de cada una.
- Juntó y subió la mayoría de las imágenes del sitio (Costanera, Mercado, Coliseo, Anfiteatro, Naranjos y la tarjeta del Kartódromo) y las puso en las tarjetas de la principal y en los carruseles de Capital del Tango.
- Reescribió el texto de presentación de la principal.
- Corrigió los links entre páginas, sacó el Museo Quinta Jovita de los menús y actualizó el texto del Festival del Tango con el link al portal oficial de la Municipalidad.
- Ajustó el diseño del menú (lugar del link a Contacto y a Mi carrito), le dio estilo a la barra de lugar anterior y siguiente y rehízo la página de Contacto con otro diseño.
- Mejoró las validaciones: en el nombre solo se aceptan letras y espacios, y en el correo (en Contacto y en el carrito) se escribe solo el usuario de Gmail.
- Cambió algunas fotos (Teatro Coliseo y la tarjeta del Kartódromo en la principal).

**Santiago Mussi**
- Hizo la página de Capital del Tango, con el carrusel, los bloques desplegables y el salto a la ubicación, y pasó la principal a Tailwind. Puso la foto de portada.
- Mejoró el popup de actividades (casilla propia, mensajes sin `alert`), antes de que se reemplazara por el carrito.
- Escribió las descripciones visibles y los textos alternativos de los carruseles de Capital del Tango, Costanera, Teatro y Kartódromo.
- Hizo el formulario de contacto, el chat de preguntas frecuentes y el mapa de la principal con las paradas numeradas.
- Unificó el navbar (misma altura, link a Contacto, navbar fijo con una clase compartida, arreglo en tablet) y puso el favicon.
- Integró la rama del carrito en `main`: arregló conflictos y un error que rompía los carruseles, el desborde del carrito en celular, que el carrito arranque con la actividad del lugar desde el que se entra y que se vacíe al terminar la compra.
- Escribió el README.

**Lautaro Peduto**
- No hay commits suyos en el repositorio. Su punto de interés en la Actividad 2 era Paseo Costanera, y esa página la armaron Paula (estructura) y Lucía (contenido).

## Cosas que nos quedaron pendientes

- No revisamos con una herramienta el contraste de todos los colores.
