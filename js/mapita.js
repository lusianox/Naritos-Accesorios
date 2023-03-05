// var map = L.map('mapita').setView([-34.6460067,-58.5939652], 11);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// // - - - MARCADOR EN EL MAPA - - -
// var encuentro1 = L.circleMarker(L.latLng(-34.6460067,-58.5939652),{
//     radius: 10,
//     fillColor: "red",
//     color: "red",
//     weight: 2,
//     opacity: 1,
//     fillOpacity: 0.6,
// }).addTo(map);

// var encuentro2 = L.circleMarker(L.latLng(-34.6416215,-58.56054),{
//     radius: 10,
//     fillColor: "red",
//     color: "red",
//     weight: 2,
//     opacity: 1,
//     fillOpacity: 0.6,
// }).addTo(map);

// var encuentro3 = L.circleMarker(L.latLng(-34.666626,-58.5502247),{
//     radius: 10,
//     fillColor: "red",
//     color: "red",
//     weight: 2,
//     opacity: 1,
//     fillOpacity: 0.6,
// }).addTo(map);

// var encuentro4 = L.circleMarker(L.latLng(-34.6848089,-58.5573727),{
//     radius: 10,
//     fillColor: "red",
//     color: "red",
//     weight: 2,
//     opacity: 1,
//     fillOpacity: 0.6,
// }).addTo(map);

// var encuentro5 = L.circleMarker(L.latLng(-34.6775445,-58.5610044),{
//     radius: 10,
//     fillColor: "red",
//     color: "red",
//     weight: 2,
//     opacity: 1,
//     fillOpacity: 0.6,
// }).addTo(map);

var mymap = L.map('mapita').setView([-34.6560067,-58.5639652], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);
  
// Agrega los marcadores con identificadores únicos
var encuentro1 = L.marker([-34.6460067,-58.5939652], {id: "encuentro1"}).addTo(mymap);
var encuentro2 = L.marker([-34.6416215,-58.56054], {id: "encuentro2"}).addTo(mymap);
var encuentro3 = L.marker([-34.666626,-58.5502247], {id: "encuentro3"}).addTo(mymap);
var encuentro4 = L.marker([-34.6848089,-58.5573727], {id: "encuentro4"}).addTo(mymap);
var encuentro5 = L.marker([-34.6775445,-58.5610044], {id: "encuentro5"}).addTo(mymap);

// Maneja el evento click en cada etiqueta <a> con el atributo "los-encuentros"
var anchors = document.querySelectorAll('a[los-encuentros]');
for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click", function(event) {
        // Previene que la página se recargue cuando se hace clic en la etiqueta <a>
        event.preventDefault();

        // Verifica si el elemento clickeado es una etiqueta <a> con el atributo "los-encuentros"
        if (event.target.getAttribute('los-encuentros') != null) {
            // Obtiene el identificador de la casa desde el atributo data-house
            var losEncuentros = event.target.getAttribute("los-encuentros");
            var encuentros = [encuentro1, encuentro2, encuentro3, encuentro4, encuentro5];
            var marcador;
            for (var i = 0; i < encuentros.length; i++) {
                if (encuentros[i].options.id === losEncuentros) {
                    marcador = encuentros[i];
                    break;
                }
            }

            // Hace zoom en el marcador y muestra su pop-up
            if (marcador) {
                marcador.openPopup();
                mymap.setView(marcador.getLatLng(), 14);
            }
        }
    });
}


//Definir una función que muestre u oculte el elemento "mapita" según corresponda

function actualizarMapita() {
    // Obtener el elemento aside
    const asideElement = document.querySelector('aside');
  
    // Obtener el elemento div con el ID "mapita"
    const mapitaElement = document.querySelector('#mapita');
  
    if (asideElement.classList.contains('aside-visible')) {
      // Si el elemento aside tiene la clase "aside-visible", ocultar el elemento "mapita"
      mapitaElement.style.display = 'none';
    } else {
      // Si el elemento aside no tiene la clase "aside-visible", mostrar el elemento "mapita"
      mapitaElement.style.display = 'block';
    }
}
  // Ejecutar la función "actualizarMapita" cada segundo
setInterval(actualizarMapita, 1000);
  

